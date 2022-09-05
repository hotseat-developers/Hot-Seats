import type { NextPage } from "next"
import { Typography, Button, Box } from "@mui/material"
import Link from "next/link"
import NewItem from "../components/NewItem"
import { useState, useEffect } from "react"
import supabase from "../lib/supabase"
import BackButton from "../components/BackButton"
import DeleteButton from "../components/DeleteButton"
import AddButton from "../components/AddButton"

type Item = {
    name: string
    id: number
}

const Manager: NextPage = () => {
    const [items, setItems] = useState<Item[]>([])

    const addItem = (created: Item) => {
        setItems([...items, created])
    }

    useEffect(() => {
        supabase
            .from<Item>("Item")
            .select("*")
            .then(({ data }) => setItems(data || []))
    }, [])

    const deleteItem = async (item: Item) => {
        await supabase.from<Item>("Item").delete().eq("id", item.id)

        setItems(items.filter(i => i.id !== item.id))
    }

    return (
        <>
            <Typography variant="h3">Who are we firing today?</Typography>
            <BackButton />
            <NewItem onCreate={addItem} />
            <Box
                sx={{
                    display: "grid",
                    gridAutoRows: "1fr",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    placeItems: "center",
                    gap: "10px",
                }}
            >
                {items &&
                    items.map(item => (
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            key={item.id}
                        >
                            <Typography variant="h5">{item.name}</Typography>
                            <DeleteButton
                                {...item}
                                onClick={() => deleteItem(item)}
                            />
                        </Box>
                    ))}
            </Box>
        </>
    )
}

export default Manager
