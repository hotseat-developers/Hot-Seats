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
import { StepTrackerContext } from "../pages/cook"

const steps = [
    {
        label: "Pull",
        description: `Time to pull the items you need for the order!`,
    },
    {
        label: "Portion",
        description: "Don't forget to portion correctly. Consistency is key.",
    },
    {
        label: "Cook",
        description: `Well obviously don't forget to cook the food.`,
    },
    {
        label: "Plate",
        description: `Time to express your art! The plate is your canvas!`,
    },
    {
        label: "Order Complete",
        description: `GET THAT SHIT OUT`,
    },
]

type VerticalLinearStepperProps = {
    orderNumber: number
    itemNumber: number
}

const VerticalLinearStepper: FC<VerticalLinearStepperProps> = ({
    orderNumber,
    itemNumber,
}) => {
    const stepTracker = useContext(StepTrackerContext)

    const [activeStep, setActiveStep] = React.useState(
        stepTracker[orderNumber][itemNumber]
    )

    const handleNext = () => {
        stepTracker.updateStep(orderNumber, itemNumber, 1)
        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        stepTracker.updateStep(orderNumber, itemNumber, -1)
        setActiveStep(activeStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">
                                        Last step
                                    </Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <IconButton
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </div>
                            </Box>
                        </StepContent>
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
    )
}

export default VerticalLinearStepper
