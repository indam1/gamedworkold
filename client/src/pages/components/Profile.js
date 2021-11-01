import React, {useContext, useState} from 'react'
import {
    Box,
    ButtonUnstyled,
    buttonUnstyledClasses,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Stack
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import styled from "@emotion/styled";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

const CustomButtonRoot = styled('button')(`
  background-color: #6FE9CD;
  padding: 15px 20px;
  border-radius: 10px;
  color: #000;
  font-weight: 600;
  font-family: Montserrat;
  font-size: 16px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #6FE9CD;
    opacity: 0.4; 
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #138C71;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`);

function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot}/>;
}

export const Profile = ({user, request}) => {
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
        }
    }

    return (
        <Box display={"flex"}>
            <Box m={"auto"}>


                <p>Имя: {user.fullName}</p>
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
                </Stack>
            </Box>
        </Box>
    )
}