import type { NextPage } from "next"
import {
    Fragment,
    useEffect,
    useState,
    createContext,
    type FC,
    useContext,
} from "react"
import { Typography, Button, Box, Tabs, Tab } from "@mui/material"
import Link from "next/link"
import BackButton from "../components/BackButton"
import supabase from "../lib/supabase"
import TaskList from "../components/Task"
import VerticalLinearStepper from "../components/ProgressBar"
import type { Task } from "../components/Task"
import formatTime from "../lib/formatting/time"
import formatOrder from "../lib/formatting/order"
import ItemScreen from "../components/ItemScreen"
import Timer from "../components/Timer"
import { useInterval } from "react-use"
import { object } from "yup"
import { useToast } from "use-toast-mui"
import { AudioContext } from "../pages/_app"
type TabPanelProps = {
    children?: React.ReactNode
    index: number
    value: number
}

type Item = {
    id: number
    name: string
}

type TabTracker = Record<number, number>

type TabTrackerProvider = {
    updateTab: (orderId: number, newItem: number) => void
} & TabTracker

type ItemOnOrder = {
    Item: Item & {
        Task: {
            id: number
            type: string
            name: string
            body: string
            photo: string
            cook_time: number
            temperature: number
            itemId: number
            task_number: number
        }[]
    }
    Order: {
        id: number
        time: string
    }
}

type Order = Record<number, ItemOnOrder[]>

type StepTracker = Record<number, Record<number, number>>

type StepTrackerProvider = {
    updateStep: (orderId: number, itemId: number, step: number) => void
} & StepTracker

export const StepTrackerContext = createContext<StepTrackerProvider>({
    updateStep(_a, _b, _c) {
        return null
    },
})

const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`order-tabpanel-${index}`}
            aria-labelledby={`order-tab-${index}`}
            style={{ height: "100%" }}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, height: "100%" }}>{children}</Box>
            )}
        </div>
    )
}

const Cook: NextPage = () => {
    const [orders, setOrders] = useState<Order>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const [activeOrder, setActiveOrder] = useState<number>(0)
    const [activeItem, setActiveItem] = useState<number>(0)
    const [stepTracker, setStepTracker] = useState<StepTracker>({})
    const [tabTracker, setTabTracker] = useState<TabTracker>({})
    const { playAudio } = useContext(AudioContext)
    const toast = useToast()
    useEffect(() => {
        supabase
            .from<ItemOnOrder>("ItemOnOrder")
            .select("Item(*, Task(*)),Order(*)")
            .then(({ data }) => {
                console.log("Data is", data)
                setActiveOrder(Math.min(...(data?.map(d => d.Order.id) || [0])))
                setOrders(
                    data?.reduce<Order>((collector, row) => {
                        if (row.Order.id in collector) {
                            collector[row.Order.id].push(row)
                        } else {
                            collector[row.Order.id] = [row]
                        }
                        return collector
                    }, {}) || []
                )
                setStepTracker(
                    data?.reduce<StepTracker>((collector, row) => {
                        if (row.Order.id in collector) {
                            collector[row.Order.id][row.Item.id] = 0
                        } else {
                            collector[row.Order.id] = { [row.Item.id]: 0 }
                        }
                        return collector
                    }, {}) || {}
                )
                setTabTracker(
                    data?.reduce<TabTracker>((collector, row) => {
                        collector[row.Order.id] = 0
                        return collector
                    }, {}) || {}
                )
            })
    }, [])

    useEffect(() => {
        console.log(orders)
    }, [orders])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('Interval is running!')
    //         for (const timerKey of Object.keys(localStorage).filter(item => {
    //             const regex = /timer-\d-\d/
    //             const check = item.match(regex)
    //             return check
    //         })) {
    //             console.log(timerKey, localStorage.getItem(timerKey))
    //             if (Number(localStorage.getItem(timerKey)) <= Date.now()) {
    //                 console.log("im here")
    //                 localStorage.removeItem(timerKey)
    //                 // setCanContinue(true)
    //                 playAudio()
    //                 toast.warning("Your food is ready for the next step!")
    //             }
    //         }
    //     }, 1000)
    //     return () => clearInterval(interval)
    // }, [playAudio, toast])

useInterval(() => {
    for (const timerKey of Object.keys(localStorage).filter(item => {
        const regex = /timer-\d+-\d+/
        const check = item.match(regex)
        return check
    })) {
        const [ _, orderNumber ] = timerKey.match(/timer-(\d+)-\d+/)!
        if (Number(localStorage.getItem(timerKey)) <= Date.now()) {
            console.log("im here")
            localStorage.removeItem(timerKey)
            // setCanContinue(true)
            playAudio()
            toast.warning(`Order #${formatOrder(orderNumber)} has item(s) that are ready for the next step.`)
        }
    }
}, 1000)

    return (
        <StepTrackerContext.Provider
            value={{
                updateStep(orderId, itemId, step = 1) {
                    setStepTracker(tracker => {
                        tracker[orderId][itemId] += step
                        return { ...tracker }
                    })
                },
                ...stepTracker,
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gridTemplateRows: "1fr 6fr",
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        gridColumn: "span 2",
                    }}
                >
                    <Tabs
                        value={activeOrder}
                        onChange={(_e, newValue) => {
                            setActiveOrder(newValue)
                            setActiveItem(tabTracker[newValue])
                        }}
                    >
                        {orders &&
                            Object.keys(orders).map(orderNum => (
                                <Tab
                                    key={`order-tab-${orderNum}`}
                                    label={`#${formatOrder(orderNum)}`}
                                    value={Number(orderNum)}
                                />
                            ))}
                    </Tabs>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                    {orders &&
                        Object.entries(orders).map(([orderNum, items]) => (
                            <Fragment key={orderNum}>
                                <TabPanel
                                    value={activeOrder}
                                    index={Number(orderNum)}
                                    key={`order-tabpanel-${orderNum}`}
                                >
                                    <Tabs
                                        value={activeItem}
                                        onChange={(_e, newValue) => {
                                            setTabTracker(tracker => {
                                                tracker[Number(orderNum)] =
                                                    newValue
                                                return tracker
                                                // Access current active tab from `tracker` and change it
                                                // tracker[someKey] = newValue
                                                // return the updated object
                                            })
                                            setActiveItem(newValue)
                                        }}
                                    >
                                        {items.map((item, i) => (
                                            <Tab
                                                key={`order-tab-${orderNum}-item-${item.Item.id}`}
                                                label={item.Item.name}
                                                value={i}
                                            />
                                        ))}
                                    </Tabs>
                                    {items.map((item, i) => (
                                        <TabPanel
                                            key={`order-tab-${orderNum}-item-${item.Item.id}-panel`}
                                            index={i}
                                            value={activeItem}
                                        >
                                            <ItemScreen {...item} />
                                        </TabPanel>
                                    ))}
                                </TabPanel>
                            </Fragment>
                        ))}
                </Box>
            </Box>
            <BackButton />
        </StepTrackerContext.Provider>
    )
}

export default Cook
