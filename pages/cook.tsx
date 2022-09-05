import type { NextPage } from "next"
import { Typography, Button } from "@mui/material"
import Link from "next/link"

import BackButton from '../components/BackButton'

const Cook: NextPage = () => {
    return (
        <>
            <Typography variant="h3">What are we cooking today?</Typography>

            <BackButton />
        </>
    )
}

export default Cook
