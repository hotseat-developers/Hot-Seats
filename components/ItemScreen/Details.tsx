import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useContext, useEffect, type FC } from 'react'

import { ItemScreenContext } from '.'
import { StepTrackerContext } from '../../pages/cook'

const Details: FC = () => {
    const item = useContext(ItemScreenContext)
    const tracker = useContext(StepTrackerContext)

    return (
        <Box>
            <Typography variant="h3">{JSON.stringify(item.Item.Task[tracker[item.Order.id][item.Item.id]], null, 2)}</Typography>

        </Box>
    )
}

export default Details
