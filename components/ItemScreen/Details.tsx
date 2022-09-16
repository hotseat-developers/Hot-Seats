import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { useTimer } from "react-timer-hook"
import { useContext, useEffect, useState, type FC } from "react"
import formatTimer from "../../lib/formatting/timer"
import { useAudio } from "react-use"
import { ItemScreenContext } from "."
import { StepTrackerContext } from "../../pages/cook"
import { useToast } from "use-toast-mui"
import { TimeValidatorContext } from "../../pages/cook"
import supabase from '../../lib/supabase'

const Details: FC = () => {
    const tracker = useContext(StepTrackerContext)
    const item = useContext(ItemScreenContext)
    const timeStamp = useContext(TimeValidatorContext)
    const activeStep = tracker[item.Order.id][item.Item.id]
    const activeTime = timeStamp[item.Order.id][item.Item.id]
    // const activeTime = false
    const task = item.Item.Task[activeStep]
    const [canContinue, setCanContinue] = useState<boolean>(
        task && (task.type !== "COOK" || activeTime)
    )
    const localStorageKey = `timer-${item.Order.id}-${item.Item.id}`
    const toast = useToast()
    useEffect(() => {
        setCanContinue(task && (task.type !== "COOK" || activeTime))
    }, [task, activeTime])

    const expiryEpoch = Number(localStorage.getItem(localStorageKey)) || 1000
    const timer = useTimer({
        expiryTimestamp: new Date(expiryEpoch),
        autoStart: expiryEpoch !== 0,
    })

    const startTimer = () => {
        const newExpiry = new Date(Date.now() + (task.cook_time || 0) * 1000)
        timer.restart(newExpiry)
        localStorage.setItem(localStorageKey, newExpiry.getTime().toString())
    }

    const handleNext = () => {
        tracker.updateStep(item.Order.id, item.Item.id, 1)
    }

    const handleBack = () => {
        tracker.updateStep(item.Order.id, item.Item.id, -1)
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100%",
            }}
        >
            {task ? (
                <>
                    <Typography variant="h4">{task.name}</Typography>
                    <Typography variant="h4">{task.temperature}F°</Typography>
                    <Typography variant="body1">{task.body}</Typography>
                    {task.type === "COOK" && (
                        <>
                            {!timer.isRunning && !canContinue ? (
                                <>
                                    <Typography variant="h3">
                                        {formatTimer(Number(task.cook_time!))}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={startTimer}
                                    >
                                        Start Timer
                                    </Button>
                                </>
                            ) : (
                                <Typography variant="h3">
                                    {formatTimer(timer)}
                                </Typography>
                            )}
                        </>
                    )}
                </>
            ) : (
                <>
                    <Typography variant="h4">All Steps Completed</Typography>
                </>
            )}

            <ButtonGroup sx={{ marginTop: "auto" }} fullWidth>
                {activeStep > 0 && (
                    <Button
                        size="large"
                        startIcon={<ArrowBackIosIcon />}
                        variant="contained"
                        onClick={handleBack}
                    >
                        Last Step
                    </Button>
                )}
                {activeStep < item.Item.Task.length && (
                    <Button
                        size="large"
                        endIcon={<ArrowForwardIosIcon />}
                        variant="contained"
                        onClick={handleNext}
                        disabled={!canContinue}
                    >
                        Next Step
                    </Button>
                )}
                {Object.values(timeStamp[item.Order.id]).every(Boolean) && (
                    <Button
                        size="large"
                        endIcon={<ArrowForwardIosIcon />}
                        variant="contained"
                        onClick={item.complete}
                    >
                        Complete Order
                    </Button>
                )}
            </ButtonGroup>
        </Box>
    )
}

export default Details
