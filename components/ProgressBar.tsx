import * as React from "react"
import { useContext, type FC } from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import { Typography, IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { StepTrackerContext } from "../pages/cook"
import type { Task } from "./Task"
import supabase from "../lib/supabase"
import { ItemScreenContext } from './ItemScreen'

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

    const [steps, setSteps] = React.useState<Task[]>([])

    React.useEffect(() => {
        supabase
            .from<Task>("Task")
            .select("*")
            .eq("itemId", itemNumber)
            .then(({ data }) => setSteps(data || []))
    }, [itemNumber])

    const activeStep = stepTracker[orderNumber][itemNumber]

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
