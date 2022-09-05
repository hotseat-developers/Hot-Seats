import type { NextPage } from "next"
import { Typography, Box, Button, IconButton } from "@mui/material"
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined"
import BackButton from "../components/BackButton"
import NewItem from "../components/NewItem"
import { useState, useEffect } from "react"
import supabase from "../lib/supabase"
import AddButton from "../components/AddButton"
import DeleteButton from "../components/DeleteButton"
import AddIcon from "@mui/icons-material/Add"

type Item = {
    name: string
    id: number
    onClick: () => void
}

const POS: NextPage = () => {
    const [items, setItems] = useState<Item[]>([])
    const [lineItems, setLineItems] = useState<Item[]>([])

    const addItem = (created: Item) => {
        setLineItems([...lineItems, created])
    }

    useEffect(() => {
        supabase
            .from<Item>("Item")
            .select("*")
            .then(({ data }) => setItems(data || []))
    }, [])

    return (
        <>
            <Typography variant="h3">Input the order here</Typography>
            <Box marginBottom="10px" display="grid" gridTemplateColumns="1fr 2fr" gap="10px">
                <Box
                    sx={{
                        display: "inline-grid",
                        gridAutoRows: "1fr",
                        gridTemplateColumns: "repeat(1, 1fr)",
                        border: "solid",
                        borderColor: "primary.main",
                        placeItems: "center",
                        minHeight: "80vh"
                    }}
                >
                    {lineItems &&
                        lineItems.map(item => (
                            <Box
                                display="flex"
                                flexDirection="row"
                                key={item.id}
                            >
                                <Typography variant="h5">
                                    {item.name}
                                </Typography>
                                <IconButton color="error">
                                    <DeleteForeverOutlinedIcon />
                                </IconButton>
                            </Box>
                        ))}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: 'space-evenly',
                        alignContent: 'flex-start',
                        gap: '10px'
                    }}
                >
                    {items &&
                        items.map(item => (
                            <Box
                                display="flex"
                                flexDirection="row"
                                key={item.id}
                            >
                                <Typography variant="h6">
                                    {item.name}
                                </Typography>
                                <IconButton color="success" onClick={() => addItem(item)}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        ))}
                </Box>
            </Box>
            <BackButton />
        </>
    )
}

export default POS
