import { useContext, type FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import VerticalLinearStepper from "../ProgressBar"
import formatOrder from '../../lib/formatting/order'
import formatTime from '../../lib/formatting/time'
import { ItemScreenContext } from '.'
const Overview: FC = () => {
    const item = useContext(ItemScreenContext)
    return (
        <Box>
            <Typography variant="h5">
                Order #{formatOrder(item.Order.id)}
            </Typography>
            <Typography variant="h6">
                Order Time: {formatTime(item.Order.time)}
            </Typography>
            <VerticalLinearStepper
                itemNumber={item.Item.id}
                orderNumber={item.Order.id}
            />
        </Box>
    )
}

export default Overview
