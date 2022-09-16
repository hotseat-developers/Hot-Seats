import { Typography, Button } from "@mui/material"

import type { FC } from "react"

type DeleteButtonProps = {
    onClick: () => void
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
    return (
        <Button variant="contained" color="error" onClick={onClick}>
            <Typography variant="button">Delete</Typography>
        </Button>
    )
}
export default DeleteButton
