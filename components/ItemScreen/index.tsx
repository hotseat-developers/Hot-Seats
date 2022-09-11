import { createContext, type FC } from "react"

import Box from "@mui/material/Box"
import Details from "./Details"
import Overview from "./Overview"
import Timer from "../Timer"

type ItemOnOrder = {
    Item: { id: number; name: string } & {
        Task: {
            id: number
            type: string
            name: string
            body: string
            photo?: string
            cook_time?: number
            temperature?: number
            itemId: number
            task_number: number
        }[]
    }
    Order: {
        id: number
        time: string
    }
}

export const ItemScreenContext = createContext<ItemOnOrder>({
    Item: {
        id: 0,
        name: "Example Item",
        Task: [
            {
                id: 0,
                type: "PREP",
                name: "Example Headline",
                body: "Example Body",
                itemId: 0,
                task_number: 1,
            },
        ],
    },
    Order: {
        id: 0,
        time: "1970-01-01T00:00:00.00",
    },
})


const ItemScreen: FC<ItemOnOrder> = item => {
    return (
        <ItemScreenContext.Provider value={item}>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                height: '99%'
            }}>
                <Overview />
                <Details />
            </Box>
        </ItemScreenContext.Provider>
    )
}

export default ItemScreen
