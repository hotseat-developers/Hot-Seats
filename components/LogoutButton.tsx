import { Button } from "@mui/material"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { useContext, type FC } from "react"

import { AuthContext } from "../pages/_app"

const LogoutButton: FC = () => {
    const { signOut, user } = useContext(AuthContext)
    if (user) {
        return (
            <Button
                startIcon={<ExitToAppIcon />}
                sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                }}
                onClick={signOut}
            >
                Sign Out
            </Button>
        )
    } else {
        return null
    }
}

export default LogoutButton
