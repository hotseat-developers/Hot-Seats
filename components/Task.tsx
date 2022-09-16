import Link from "next/link"
import { Typography, Button } from "@mui/material"
import type { FC } from "react"
import supabase from "../lib/supabase"
import { useState, useEffect } from "react"

export type Task = {
    id: number
    type: string
    name: string
    body: string
    photo: string
    cook_time: number
    temperature: number
    itemId: number
    task_number: number
}

type TaskProps = {
    itemId: number
}

const TaskList: FC<TaskProps> = ({ itemId }) => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        supabase
            .from<Task>("Task")
            .select("*")
            .eq('itemId', itemId)
            .then(({ data }) => setTasks(data || []))
    }, [ itemId ])
    return <Typography variant="h6">{JSON.stringify(tasks, null, 2)}</Typography>
}

export default TaskList
