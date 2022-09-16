import { TextField } from "@mui/material"
import  {useField, type FieldAttributes}  from "formik"
import type { FC } from "react"






const CustomTextField: FC<FieldAttributes<{}>> = ({
    placeholder,
    ...props
}) => {
    const [field, meta] = useField<{}>(props)
    const errorText = meta.error && meta.touched ? meta.error : ""
    return (
        <TextField
            
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
export default CustomTextField