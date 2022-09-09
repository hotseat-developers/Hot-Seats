import { Typography, Button } from "@mui/material"
import BackButton from "../../components/BackButton"
import type { FC } from "react"
import Router from "next/router"
import type { GetServerSideProps } from "next"
import type { Task } from "../../components/Task"
import supabase from "../../lib/supabase"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useToggle } from "react-use"
import { Formik, Form, Field, useField, type FieldAttributes } from "formik"
import TextField from "@mui/material/TextField"
import * as yup from "yup"
import ErrorMessage from "../../components/ErrorMessage"
import TaskView from "../../components/TaskView"

const CustomTextField: FC<FieldAttributes<{}>> = ({
    placeholder,
    ...props
}) => {
    const [field, meta] = useField<{}>(props)
    const errorText = meta.error && meta.touched ? meta.error : ""
    return (
        <TextField
            placeholder={placeholder}
            helperText={errorText}
            error={!!errorText}
            autoFocus
            required
            fullWidth
            label={placeholder}
            {...field}
        />
    )
}

type Item = {
    name: string
    id: number
}

type EditTaskProps = {
    item: Item
    tasker: Task[]
}

export const getServerSideProps: GetServerSideProps = async context => {
    let { data, error } = await supabase
        .from("Item")
        .select("*")
        .eq("id", context.params?.id)
    let { data: info } = await supabase
        .from("Task")
        .select("*")
        .eq("itemId", context.params?.id)
    return {
        props: {
            item: data![0],
            tasker: info!,
        },
    }
}

const validationSchema = yup.object({
    name: yup.string().required(),
})

type NewTaskProps = {
    onCreate: (created: Task) => void
}
const EditPage: FC<EditTaskProps> = ({ item, tasker }) => {
    const [tasks, setTasks] = useState<Task[]>(tasker)
    const [collapsed, toggleCollapsed] = useToggle(true)
    const [error, setError] = useState<string>()
    const editTask = async (task: Task) => {
        await supabase.from("Task").update({ id: "id" }).eq("id", task.id)
    }
    const addTask = (created: Task) => {
        setTasks([...tasks, created])
    }
    const router = useRouter()

    return (
        <>
            <Typography variant="h1">{item.name}</Typography>
            <TaskView arrTasks={tasks} />
            <div>
                <Button variant="contained" onClick={toggleCollapsed}>
                    <Typography variant="button">Add a new task</Typography>
                </Button>
            </div>
            ) : (
            <div className="flex flex-col gap-2 bg-dots-pattern bg-dots-color shadow-hard-border border-black p-3">
                <h2 className="text-3xl font-bangers tracking-wide text-white text-outline-black">
                    New Task
                </h2>
                <Formik
                    isInitialValid={false}
                    validationSchema={validationSchema}
                    initialValues={{
                        name: "",
                        itemId: item.id,
                        body: "",
                        task_number: 0,
                    }}
                    onSubmit={async values => {
                        try {
                            const { data, error } = await supabase
                                .from<Task>("Task")
                                .insert([values])

                            addTask(data![0])
                            toggleCollapsed()
                            setError(undefined)
                        } catch (e: any) {
                            console.log(e)
                            setError("Could not find this item, sorry")
                        } finally {
                        }
                    }}
                >
                    {({ isValid }) => (
                        <Form className="text-white font-bangers tracking-wide flex flex-col gap-3">
                            <Field
                                name="name"
                                type="text"
                                as={CustomTextField}
                                placeholder="Task Name"
                            />
                            <Field
                                name="body"
                                type="text"
                                as={CustomTextField}
                                placeholder="Description"
                            />
                            <Field
                                name="task_number"
                                type="number"
                                as={CustomTextField}
                                placeholder="Step Number"
                            />
                            <Field
                                name="type"
                                type="text"
                                as={CustomTextField}
                                placeholder="cooking or prepping"
                            />

                            <Button
                                variant="contained"
                                disabled={!isValid}
                                type="submit"
                            >
                                Add
                            </Button>
                            <ErrorMessage message={error} />
                        </Form>
                    )}
                </Formik>
            </div>
            <Button variant="contained">
                <Typography variant="button">
                    <div onClick={() => Router.back()}>Go Back</div>
                </Typography>
            </Button>
        </>
    )
}
export default EditPage
