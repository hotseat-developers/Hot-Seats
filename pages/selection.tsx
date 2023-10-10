import Link from "next/link"
import { Typography, Container, Button, Box } from "@mui/material"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import StoreIcon from "@mui/icons-material/Store"
import HailIcon from "@mui/icons-material/Hail"
import type { NextPage } from "next"
import LogoutButton from "../components/LogoutButton"

const Selection: NextPage = () => {
    return (
        <Container component="main" maxWidth="lg" sx={{ minHeight: "100vh" }}>
            <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                minHeight="100vh"
                gap={10}
            >
                <Typography align="center" variant="h4">
                    Select your position
                </Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-evenly"
                >
                    <LogoutButton/>
                    <Link href="/cook">
                        <Button
                            variant="contained"
                            startIcon={<RestaurantIcon />}
                            size="large"
                        >
                            <Typography variant="button">Cook</Typography>
                        </Button>
                    </Link>
                    <Link href="/pos">
                        <Button variant="contained" startIcon={<StoreIcon />} size="large">
                            <Typography variant="button">POS</Typography>
                        </Button>
                    </Link>
                    <Link href="/manager">
                        <Button variant="contained" startIcon={<HailIcon />} size="large">
                            <Typography variant="button">Manager</Typography>
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    )
}

export default Selection
