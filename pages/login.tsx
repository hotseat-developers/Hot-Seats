import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import MUILink from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "next/link"
import { Formik, Form, Field, useField, type FieldAttributes } from "formik"
import * as yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(yup)

import type { NextPage } from "next"
import type { FC } from "react"

import Copyright from "../components/Copyright"



const EmailField: FC<FieldAttributes<{}>> = ({
    placeholder,
    ...props
}) => {
    const [field, meta] = useField<{}>(props)
    const errorText = meta.error && meta.touched ? meta.error : ""
    return (
        <TextField
            placeholder={placeholder}
            helperText={errorText}
            error={!!errorText}
            autoFocus
            required
            fullWidth
            label={placeholder}
            autoComplete="email"
            {...field}
        />
    )
}

const PasswordField: FC<FieldAttributes<{}>> = ({
    placeholder,
    ...props
}) => {
    const [field, meta] = useField<{}>(props)
    const errorText = meta.error && meta.touched ? meta.error : ""
    return (
        <TextField
            placeholder={placeholder}
            helperText={errorText}
            error={!!errorText}
            autoFocus
            required
            fullWidth
            type="password"
            label={placeholder}
            autoComplete="current-password"
            {...field}
        />
    )
}

const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().password()
        .min(8)
        .minUppercase(1)
        .minSymbols(1)
        .required()
})

const SignUp: NextPage = () => {

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(data) => {
                        console.log(data)
                    }}
                    validationSchema={validationSchema}
                    validateOnMount={true}
                >
                    {({ isValid }) => (
                        <Box component={Form} noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field placeholder="Email Address" name="email" as={EmailField} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field placeholder="Password" name="password" as={PasswordField} />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={!isValid}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signup">
                                        <MUILink variant="body2">
                                            Need an account? Sign up
                                        </MUILink>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Formik>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}

export default SignUp
