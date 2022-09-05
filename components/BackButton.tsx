import Link from 'next/link'
import { Typography, Button } from '@mui/material'

import type { FC } from "react"

const BackButton: FC = () => {
    return (
        <Link href="/selection">
            <Button variant="contained">
                <Typography variant="button">Back to Selection</Typography>
            </Button>
        </Link>
    )
}
export default BackButton
