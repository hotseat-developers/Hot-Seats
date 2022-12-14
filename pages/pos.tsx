import type { NextPage } from "next"
import { Typography, Box, IconButton, Button, ButtonGroup } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined"
import BackButton from "../components/BackButton"
import { useState, useEffect } from "react"
import supabase from "../lib/supabase"
import AddIcon from "@mui/icons-material/Add"
import CompleteButton from "../components/CompleteButton"
import { useToast } from "use-toast-mui"

type Item = {
    name: string
    id: number
    onClick: () => void
}

type Order = {
    id: number
    time: Date
}

type ItemOnOrder = {
    itemId: number
    orderId: number
}

const POS: NextPage = () => {
    const [items, setItems] = useState<Item[]>([])
    const [lineItems, setLineItems] = useState<Item[]>([])
    const [ submitting, setSubmitting ] = useState<boolean>(false)

    const toast = useToast()

    const itemOrder = async () => {
        setSubmitting(true)
        const { data: insertedOrders, error: orderInsertError } = await supabase
            .from<Order>("Order")
            .insert({})
        if (orderInsertError) {
            toast.error('An unexpected error has occurred.')
            throw orderInsertError
        }
        const { error: lineItemsInsertError } = await supabase
            .from<ItemOnOrder>("ItemOnOrder")
            .insert(
                lineItems.map<ItemOnOrder>(lineItem => ({
                    itemId: lineItem.id,
                    orderId: insertedOrders[0]?.id,
                }))
            )
        if (lineItemsInsertError) {
            toast.error('An unexpected error has occurred.')
            throw lineItemsInsertError
        } else {
            toast.success(`Order #${insertedOrders[0].id.toString().padStart(3, '0')} submitted successfully!`)
            setLineItems([])
        }
        setSubmitting(false)
    }

    const addItem = (created: Item) => {
        setLineItems([...lineItems, created])
    }

    const removeLineItem = (item: Item) => {
        setLineItems(lineItems.filter(i => i.id !== item.id))
    }

    const clearLineItems = () => {
        setLineItems([])
        toast.warning('Items cleared')
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
            <Box
                marginBottom="10px"
                display="grid"
                gridTemplateColumns="1fr 2fr"
                gap="10px"
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        border: "solid",
                        borderColor: "primary.main",
                        placeItems: "center",
                        minHeight: "80vh",
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
                                <IconButton
                                    color="error"
                                    onClick={() => removeLineItem(item)}
                                >
                                    <DeleteForeverOutlinedIcon />
                                </IconButton>
                            </Box>
                        ))}
                    <ButtonGroup sx={{
                        marginTop: 'auto',
                        marginBottom: '5px',
                        width: '95%'
                    }} fullWidth>
                        <CompleteButton onClick={itemOrder} loading={submitting} />
                        <Button variant="contained" color="warning" onClick={clearLineItems}>Clear Items</Button>
                    </ButtonGroup>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        alignContent: "flex-start",
                        gap: "10px",
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
                                <IconButton
                                    color="success"
                                    onClick={() => addItem(item)}
                                >
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
