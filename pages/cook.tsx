import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { Typography, Button } from "@mui/material"
import Link from "next/link"
import BackButton from "../components/BackButton"
import supabase from "../lib/supabase"


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

    useEffect(() => {
        supabase
            .from<ItemOnOrder>("ItemOnOrder")
            .select("Item(*),Order(*)")
            .then(({ data }) => {
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
            <Typography variant="h3">What are we cooking today?</Typography>

            <BackButton />
        </>
    )
}

export default Cook
