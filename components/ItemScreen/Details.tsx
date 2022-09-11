import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useContext, useEffect, type FC } from 'react'

import { ItemScreenContext } from '.'
import { StepTrackerContext } from '../../pages/cook'

const Details: FC = () => {
    const tracker = useContext(StepTrackerContext)
    const item = useContext(ItemScreenContext)
    const task = item.Item.Task[tracker[item.Order.id][item.Item.id]]

    return (
        <Box>
            { task ? (
                <>
                    <Typography variant="h4">{task.name}</Typography>
                    <Typography variant="body1">{task.body}</Typography>
                </>
            ) : (
                <>
                    <Typography variant="h4">All Steps Completed</Typography>
                </>
            )}

        </Box>
    )
}

export default Details
