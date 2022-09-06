import Link from 'next/link'
import { Typography, Button } from '@mui/material'
import type { FC } from "react"



type CompleteButtonProps = {
    onClick: () => void
}

const CompleteButton: FC<CompleteButtonProps> = ({ onClick }) => {
    return (
        <Button sx={{ width: '90%', marginTop: 'auto', marginBottom: '10px' }} variant="contained" color="success" onClick={onClick}>
            <Typography variant="button">Complete Order</Typography>
        </Button>
    )
}

export default CompleteButton
