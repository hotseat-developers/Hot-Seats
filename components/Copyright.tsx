import type { FC } from "react"
import Typography from "@mui/material/Typography"
import MUILink from "@mui/material/Link"
import Link from "next/link"

const Copyright: FC<any> = props => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link href="/">
                <MUILink color="inherit">HotSeat Developers</MUILink>
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}

export default Copyright
