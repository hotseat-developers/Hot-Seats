import { Typography, Button } from "@mui/material"

import type { FC } from "react"

type AddButtonProps = {
    onClick: () => void
}

const AddButton: FC<AddButtonProps> = ({ onClick }) => {
    return (
        <Button variant="contained" color="success" onClick={onClick}>
            <Typography variant="button">Add Item</Typography>
        </Button>
    )
}
export default AddButton
