import type { NextPage } from "next"
import { useEffect, useState, type FC } from "react"
import { Typography, Button, Box, Tabs, Tab } from "@mui/material"
import Link from "next/link"
import BackButton from "../components/BackButton"
import supabase from "../lib/supabase"
import TaskList from "../components/Task"

type TabPanelProps = {
    children?: React.ReactNode
    index: number
    value: number
}

const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`order-tabpanel-${index}`}
            aria-labelledby={`order-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

const Cook: NextPage = () => {
    type Item = {
        id: number
        name: string
    }

    type Order = Record<number, Item[]>
    type ItemOnOrder = {
        Item: Item
        Order: {
            id: number
            time: Date
        }
    }
    const [orders, setOrders] = useState<Order>([])
    const [activeOrder, setActiveOrder] = useState<number>(0)
    const [activeItem, setActiveItem] = useState<number>(0)

    useEffect(() => {
        supabase
            .from<ItemOnOrder>("ItemOnOrder")
            .select("Item(*),Order(*)")
            .then(({ data }) => {
                setActiveOrder(Math.min(...(data?.map(d => d.Order.id) || [0])))
                setOrders(
                    data?.reduce<Order>((collector, row) => {
                        if (row.Order.id in collector) {
                            collector[row.Order.id].push(row.Item)
                        } else {
                            collector[row.Order.id] = [row.Item]
                        }
                        return collector
                    }, {}) || []
                )
            })
    }, [])

    useEffect(() => {
        console.log(orders)
    }, [orders])

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gridTemplateRows: "1fr 1fr 6fr",
                    maxHeight: "80vh",
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
                            setActiveItem(0)
                        }}
                    >
                        {orders &&
                            Object.keys(orders).map(orderNum => (
                                <Tab
                                    key={`order-tab-${orderNum}`}
                                    label={`#${orderNum.padStart(3, "0")}`}
                                    value={Number(orderNum)}
                                />
                            ))}
                    </Tabs>
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                    {orders &&
                        Object.entries(orders).map(([orderNum, items]) => (
                            <TabPanel
                                value={activeOrder}
                                index={Number(orderNum)}
                                key={`order-tabpanel-${orderNum}`}
                            >
                                <Tabs
                                    value={activeItem}
                                    onChange={(_e, newValue) =>
                                        setActiveItem(newValue)
                                    }
                                >
                                    {items.map((item, i) => (
                                        <Tab
                                            key={`order-tab-${orderNum}-item-${item.id}`}
                                            label={item.name}
                                            value={i}
                                        />
                                    ))}
                                </Tabs>
                                {items.map((item, i) => (
                                    <TabPanel
                                        key={`order-tab-${orderNum}-item-${item.id}-panel`}
                                        index={i}
                                        value={activeItem}
                                    >
                                        <TaskList itemId={item.id} />
                                    </TabPanel>
                                ))}
                            </TabPanel>
                        ))}
                </Box>
            </Box>
            <BackButton />
        </>
    )
}

export default Cook
