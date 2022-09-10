import Link from "next/link"
import { Typography, Button, Box } from "@mui/material"
import type { FC } from "react"
import supabase from "../lib/supabase"
import { useState, useEffect } from "react"
import { minWidth } from "@mui/system"
import EditButton from "./EditButton"
import { Formik, Form, Field } from "formik"
import CustomTextField from "./CustomTextField"
import Attribute from "./Attributes"
import { useToggle } from "react-use"


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
    arrTasks: Task[],
    setParentTasks:Function
}

const editTask = async (task: Task) => {
    await supabase.from("Task").update(task).eq("id", task.id)
}
const TaskList: FC<TaskProps> = ({ arrTasks,setParentTasks }) => {
    const [configures, setConfigure] = useState<boolean>(false)
    const [ editing, toggleEditing ] = useToggle(false)
    const [tasks, setTasks] = useState<Task[]>(arrTasks)


    const editButtonClick = (submitFunc: Function) => {
        if(editing) {
            submitFunc()
        }
        toggleEditing()

    }



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
                        maxWidth: "80vh",
                    }}
                >
                    <Formik
                        initialValues={task}
                        onSubmit={async values => {
                            await supabase
                                .from("Task")
                                .update(values)
                                .eq("id", task.id)
                                setParentTasks(tasks.map(t => t.id === task.id ? values : t))
                        }}
                    >
                        {({submitForm}) => (
                            <Form className="font-bangers text-white text-3xl">
                                {editing ? (
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        gap="10px"
                                    >
                                        <Field
                                            as={CustomTextField}
                                            name="name"
                                            placeholder="name"
                                        />
                                        <Field
                                            as={CustomTextField}
                                            name="body"
                                            placeholder="body"
                                        />
                                        <Field
                                            as={CustomTextField}
                                            name="cook_time"
                                            placeholder="Cook Time"
                                            type="number"
                                        />
                                        <Field
                                            as={CustomTextField}
                                            name="temperature"
                                            placeholder="Temperature"
                                            type="number"
                                        />
                                    </Box>
                                ) : (
                                    <>
                                        <Attribute
                                            label="Name"
                                            value={task.name}
                                        />
                                        <Attribute
                                            label="Body"
                                            value={task.body}
                                        />
                                        <Attribute
                                            label="Cook Time"
                                            value={task.cook_time}
                                        />
                                        <Attribute
                                            label="Temperature"
                                            value={task.temperature}
                                        />
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={() => editButtonClick(submitForm)}
                                >
                                    {editing ? "Submit Changes" : "Edit"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    
                </Box>
            ))}
        </>
    )
}
export default TaskList
