import { useState, type Dispatch, SetStateAction, FC } from "react"
import { useToggle } from "react-use"
import { Formik, Form, Field, useField, type FieldAttributes } from "formik"
import TextField from "@mui/material/TextField"
import * as yup from "yup"
import ErrorMessage from "./ErrorMessage"
import supabase from "../lib/supabase"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

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
    onClick: () => void
}

type NewItemProps = {
    onCreate: (created: Item) => void
}

const validationSchema = yup.object({
    name: yup.string().required(),
})

const NewItem: FC<NewItemProps> = ({ onCreate }) => {
    const [collapsed, toggleCollapsed] = useToggle(true)
    const [error, setError] = useState<string>()

    return collapsed ? (
        <div>
            <Button variant="contained" onClick={toggleCollapsed}><Typography variant="button">Add a new item</Typography></Button>
        </div>
    ) : (
        <div className="flex flex-col gap-2 bg-dots-pattern bg-dots-color shadow-hard-border border-black p-3">
            <h2 className="text-3xl font-bangers tracking-wide text-white text-outline-black">
                New Item
            </h2>
            <Formik
                isInitialValid={false}
                validationSchema={validationSchema}
                initialValues={{
                    name: "",
                }}
                onSubmit={async values => {
                    try {
                        const { data, error } = await supabase
                            .from<Item>("Item")
                            .insert([values])

                        onCreate(data![0])
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
                        <Field name="name" type="text" as={CustomTextField} placeholder="Item Name"/>
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
    )
}

export default NewItem
