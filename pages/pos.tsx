import type { NextPage } from "next"
import { Typography } from "@mui/material"
import BackButton from "../components/BackButton"

const POS: NextPage = () => {
    return (
        <>
            <Typography variant="h3">Who are we ripping off today?</Typography>
            <BackButton />
        </>
    )
}

export default POS
