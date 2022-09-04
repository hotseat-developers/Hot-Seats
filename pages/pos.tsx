import type { NextPage } from "next"
import { Typography, Button } from "@mui/material"
import Link from "next/link"

const POS: NextPage = () => {
    return (
        <>
            <Typography variant="h3">Who are we ripping off today?</Typography>
            <Button>
            <Link href="/selection">
                <Typography variant="button">Back to Selection</Typography>
                </Link>
            </Button>
        </>
    )
}

export default POS
