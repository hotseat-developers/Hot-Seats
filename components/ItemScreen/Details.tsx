import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useContext, useEffect, type FC } from 'react'

import { ItemScreenContext } from '.'
import { StepTrackerContext } from '../../pages/cook'

const Details: FC = () => {
    const tracker = useContext(StepTrackerContext)
    const item = useContext(ItemScreenContext)

    return (
        <Box>
            <Typography variant="body1">{JSON.stringify(item.Item.Task[tracker[item.Order.id][item.Item.id]], null, 2)}</Typography>

        </Box>
    )
}

export default Details
