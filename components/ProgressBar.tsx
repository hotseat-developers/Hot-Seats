import * as React from "react"
import { useContext, useEffect, useState, type FC } from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import { Typography } from "@mui/material"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { StepTrackerContext } from "../pages/cook"
import type { Task } from "./Task"
import supabase from "../lib/supabase"
import { ItemScreenContext } from './ItemScreen'
import { TimeValidatorContext } from '../pages/cook'

type VerticalLinearStepperProps = {
    orderNumber: number
    itemNumber: number
}

const VerticalLinearStepper: FC<VerticalLinearStepperProps> = ({
    orderNumber,
    itemNumber,
}) => {
    const stepTracker = useContext(StepTrackerContext)
    const item = useContext(ItemScreenContext)
    const validator = useContext(TimeValidatorContext)

    const [steps, setSteps] = useState<Task[]>([])
    const [ loaded, setLoaded ] = useState<boolean>(false)

    useEffect(() => {
        supabase
            .from<Task>("Task")
            .select("*")
            .eq("itemId", itemNumber)
            .then(({ data }) => {
                setSteps(data || [])
                setLoaded(true)
            })
    }, [itemNumber])

    const activeStep = stepTracker[orderNumber][itemNumber]

    // useEffect(() => {
    //     if (loaded && activeStep === steps.length) {
    //         validator.setCanContinue(orderNumber, itemNumber)
    //     }
    // }, [activeStep, itemNumber, loaded, orderNumber, steps.length, validator])

    const handleReset = () => {
        stepTracker.updateStep(orderNumber, itemNumber, -item.Item.Task.length)
    }

    return (
        <>
            {steps && (
                <Box sx={{ maxWidth: 400 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.name}>
                                <StepLabel
                                    optional={
                                        index === 2 ? (
                                            <Typography variant="caption">
                                                Last step
                                            </Typography>
                                        ) : null
                                    }
                                    StepIconComponent={step.type === 'PREP' ? MenuBookIcon : WhatshotIcon}
                                >
                                    {step.name}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Reset
                            </Button>
                        </Paper>
                    )}
                </Box>
            )}
        </>
    )
}

export default VerticalLinearStepper
