import Link from "next/link"
import { Typography, Button, Box } from "@mui/material"
import type { FC } from "react"
import supabase from "../lib/supabase"
import { useState, useEffect } from "react"
import { minWidth } from "@mui/system"

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
    arrTasks: Task[]
}

const TaskList: FC<TaskProps> = ({ arrTasks }) => {
    return (
        <>
            {arrTasks.map(task => (
                <Box
                    key={task.id}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        border: "solid",
                        borderColor: "primary.main",
                        placeItems: "center",
                        margin: "10px",
                        maxWidth:"80vh"
                    }}
                >
                    <Typography variant="h6">{task.body}</Typography>
                    <Typography variant="h6">{task.cook_time}</Typography>
                    <Typography variant="h6">{task.task_number}</Typography>
                    {/* <Typography variant="h6">{task.type}</Typography> */}
                    <Typography variant="h6">{task.itemId}</Typography>
                </Box>
            ))}
        </>
    )
}
export default TaskList
