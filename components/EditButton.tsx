import { Typography, Button } from "@mui/material"
import supabase from "../lib/supabase"
import type { FC } from "react"
import type {Task} from "../components/Task"
import Link from "next/link"

type EditButtonProps = {
    onClick: () => void
}

const editTask = async (task: Task) => {
    await supabase.from("Task").update({ id: "id" }).eq("id", task.id)
}
const EditButton: FC<EditButtonProps> = ({ onClick }) => {
    return (
        
            <Button variant="contained" color="warning">
                <Typography variant="button">Edit</Typography>
            </Button>
        
    )
}
export default EditButton
