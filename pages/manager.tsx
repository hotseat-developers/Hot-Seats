import type { NextPage } from "next"
import { Typography, Button } from "@mui/material"
import Link from "next/link"
import NewItem from "../components/NewItem"
import { useState, useEffect } from 'react'
import supabase from "../lib/supabase"
import BackButton from '../components/BackButton'
type Item = {
    name: string
}

const Manager: NextPage = () => {
    const [items, setItems] = useState<Item[]>([])

    const addItem = (created: Item) =>{
        setItems([...items, created])
    }

    supabase
        .from<Item>('Item')
        .select('name')
        .then(({ data }) => setItems(data || []))

    return (
        <>
            <Typography variant="h3">Who are we firing today?</Typography>
            <BackButton />


        </>
            )}


export default Manager
