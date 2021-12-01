import React, {useContext, useState} from 'react'
import {Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import CustomButton from "./CustomButton";
import TransitionAlerts from "./TransitionAlerts";

export const Profile = ({user, request, message, open, onChange, changeOpen}) => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const [form, setForm] = useState({
        email: user.email,
        oldPassword: '',
        newPassword: '',
    })
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handlerShowOldPassword = () => {
        setShowPassword({...showPassword, "oldPassword": !showPassword.oldPassword})
    }

    const handlerShowNewPassword = () => {
        setShowPassword({...showPassword, "newPassword": !showPassword.newPassword})
    }

    const changePasswordHandler = async (event) => {
        try {
            const data = await request('/api/auth/change', 'POST', {...form})
            console.log("hi")
            console.log("Data", data)
            event.preventDefault()
            auth.logout()
            history.push('/login')
        } catch (e) {
            onChange(e.message)
        }
    }

    return (
        <Box display={"flex"}>
            <Box m={"auto"}>
                <p>Имя: {user.firstName + " " + user.lastName}</p>
                <p>Почта: {user.email}</p>
                <p>Id: {user._id}</p>
                <Stack spacing={2}>
                    <FormControl variant={"standard"}>
                        <InputLabel htmlFor="standard-adornment-password">Old Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword.oldPassword ? "text" : "password"}
                            value={form.oldPassword}
                            onChange={changeHandler}
                            label="oldPassword"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handlerShowOldPassword}
                                    >
                                        {showPassword.oldPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            name="oldPassword"
                        />
                    </FormControl>

                    <FormControl variant={"standard"}>
                        <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword.newPassword ? "text" : "password"}
                            value={form.newPassword}
                            onChange={changeHandler}
                            label="newPassword"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handlerShowNewPassword}
                                    >
                                        {showPassword.newPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            name="newPassword"
                        />
                    </FormControl>

                    <Box sx={{boxShadow: 3}} style={{borderRadius: 10}}>
                        <CustomButton
                            onClick={changePasswordHandler}
                            style={{width: "100%"}}
                            variant="contained"
                        >
                            Change password
                        </CustomButton>
                    </Box>
                    {open && <TransitionAlerts
                        style={{borderRadius: 10}}
                        messages={message}
                        onChange={changeOpen}
                    />}
                </Stack>
            </Box>
        </Box>
    )
}