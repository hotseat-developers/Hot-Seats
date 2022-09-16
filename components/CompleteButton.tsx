import { Typography, Button } from '@mui/material'
import LoadingButton from "@mui/lab/LoadingButton"
import type { FC } from "react"



type CompleteButtonProps = {
    onClick: () => void
    loading: boolean
}

const CompleteButton: FC<CompleteButtonProps> = ({ onClick, loading }) => {
    return (
        <LoadingButton variant="contained" color="success" onClick={onClick} loading={loading}>
            <Typography variant="button">Complete Order</Typography>
        </LoadingButton>
    )
}

export default CompleteButton
