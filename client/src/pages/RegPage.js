import {Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Link, Stack} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import GoogleLogin from "react-google-login";
import {AuthContext} from "../context/AuthContext";
import CustomButton from "./components/CustomButton";
import TransitionAlerts from "./components/TransitionAlerts";

function RegPage() {
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    })
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const handlerShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj

        try {
            const data = await request('api/auth/register', 'POST', {
                email: result.email,
                password: "testpassword",
                firstName: result.givenName,
                lastName: result.familyName
            })
            console.log("Data: ", data);
            const log = await request('/api/auth/login', 'POST', {email: result.email, password: "testpassword"})
            auth.login(log.token, log.userId)
        } catch (e) {
        }
    }

    const googleFailure = (error) => {
        console.log(error)
    }

    useEffect(() => {
        clearError()
    }, [error, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log("Data: ", data);
            const log = await request('/api/auth/login', 'POST', {email: form.email, password: form.password})
            auth.login(log.token, log.userId)
        } catch (e) {
            setMessage(e.message)
            setOpen(true)
        }
    }

    return (
        <div
            style={{
                height: "100vh",
                alignItems: "center",
                justifyContent: "right",
                display: "flex",
                backgroundColor: "#6065DA"
            }}
        >
            <Box sx={{
                width: "65vw",
                height: "100vh",
                border: "1px dashed grey",
                borderTopLeftRadius: 38,
                borderBottomLeftRadius: 38,
                backgroundColor: "white",
                display: "flex",
                alignItems: "center"
            }}>
                <Stack spacing={3} style={{alignItems: "center", width: "100%"}}>
                    <div style={{
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "25px",
                        color: "black",
                        align: "left"
                    }}
                    >
                        <span>Create Account</span>
                    </div>
                    <GoogleLogin
                        clientId={"395298739700-7tp6r19ofpj2hllip8i7vn8mnced5ol0.apps.googleusercontent.com"}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                    />
                    <div style={{
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "18px",
                        color: "#909090",
                        align: "center"
                    }}
                    >
                        <span>- OR -</span>
                    </div>
                    <Stack direction={"row"} sx={{width: "35%"}} justifyContent={"space-between"}>
                        <FormControl sx={{width: "45%"}} variant={"standard"}>
                            <InputLabel htmlFor="standard-required">First Name</InputLabel>
                            <Input
                                required
                                id="standard-required"
                                value={form.firstName}
                                onChange={changeHandler}
                                label="First Name"
                                variant="standard"
                                name="firstName"
                            />
                        </FormControl>
                        <FormControl sx={{width: "45%"}} variant={"standard"}>
                            <InputLabel htmlFor="standard-required">Last Name</InputLabel>
                            <Input
                                required
                                id="standard-required"
                                value={form.lastName}
                                onChange={changeHandler}
                                label="Last Name"
                                variant="standard"
                                name="lastName"
                            />
                        </FormControl>
                    </Stack>
                    <FormControl sx={{width: "35%"}} variant={"standard"}>
                        <InputLabel htmlFor="standard-required">Email</InputLabel>
                        <Input
                            required
                            id="standard-required"
                            type={"email"}
                            value={form.email}
                            onChange={changeHandler}
                            label="Email"
                            name="email"
                        />
                    </FormControl>
                    <FormControl sx={{width: "35%"}} variant={"standard"}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={changeHandler}
                            label="Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handlerShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            name="password"
                        />
                    </FormControl>

                    <Box sx={{boxShadow: 3}} style={{width: "35%", borderRadius: 10}}>
                        <CustomButton
                            disabled={loading}
                            onClick={registerHandler}
                            style={{width: "100%"}}
                            variant="contained"
                        >
                            Create Account
                        </CustomButton>
                    </Box>
                    {open && <TransitionAlerts
                        style={{width: "35%", borderRadius: 10}}
                        messages={message}
                        onChange={(smth) => {
                            setOpen(smth)
                        }}
                    />}
                    <div style={{
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "#A0A0A0",
                        align: "center"
                    }}
                    >
                        <span>Already have an account?
                            <Link
                                color="#6FE9CD"
                                underline="none"
                                href='/login'
                            >
                            {" Log in"}
                            </Link>
                        </span>
                    </div>
                </Stack>
            </Box>
        </div>
    );
}

export default RegPage