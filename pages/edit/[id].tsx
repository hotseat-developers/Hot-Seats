import { Typography, Button } from "@mui/material"
import BackButton from "../../components/BackButton"
import type { FC } from "react"
import Router from "next/router"
import type { GetServerSideProps } from "next"
import type { Task } from "../../components/Task"
import supabase from "../../lib/supabase"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"


type Item = {
    name: string
    id: number
}

type EditTaskProps ={
    item:Item
}


export const getServerSideProps: GetServerSideProps = async context => {
    let { data, error } = await supabase
        .from("Item")
        .select("*")
        .eq("id", context.params?.id)
    return {
        props: {
            item: data![0],
        },
    }
}





const EditPage: FC<EditTaskProps> = ({ item }) => {
    const [tasks, setTasks] = useState<Task[]>([])

    const editTask = async (task: Task) => {
        await supabase.from("Task").update({ id: "id" }).eq("id", task.id)
    }
    const router = useRouter()

    return (
        <>
            <Typography variant="h1">{item.name}</Typography>

            <Button variant="contained">
                <Typography variant="button">
                    <div onClick={() => Router.back()}>Go Back</div>
                </Typography>
            </Button>
        </>
    )
}
export default EditPage
