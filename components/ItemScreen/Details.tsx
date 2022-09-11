import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useContext, useEffect, type FC } from 'react'

import { ItemScreenContext } from '.'
import { StepTrackerContext } from '../../pages/cook'

const Details: FC = () => {
    const tracker = useContext(StepTrackerContext)
    const item = useContext(ItemScreenContext)
    const task = item.Item.Task[tracker[item.Order.id][item.Item.id]]

    const handleNext = () => {
        tracker.updateStep(item.Order.id, item.Item.id, 1)
    }

    const handleBack = () => {
        tracker.updateStep(item.Order.id, item.Item.id, -1)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minhHeight: '100%'
        }}>
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

            <ButtonGroup sx={{ marginTop: 'auto'}} fullWidth>
                <Button size="large" startIcon={<ArrowBackIosIcon />} variant="contained" onClick={handleNext}>Last Step</Button>
                <Button size="large" endIcon={<ArrowForwardIosIcon />} variant="contained" onClick={handleBack}>Next Step</Button>
            </ButtonGroup>

        </Box>
    )
}

export default Details
