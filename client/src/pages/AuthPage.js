import {
    Box,
    ButtonUnstyled,
    buttonUnstyledClasses,
    Checkbox, FormControl, IconButton, InputAdornment, InputLabel,
    Link,
    OutlinedInput,
    Stack,
    SvgIcon,
    TextField
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import styled from "@emotion/styled";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import GoogleLogin from "react-google-login";

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

function AuthPage() {
    const auth = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handlerShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        clearError()
    }, [error, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            const data = await request('/api/auth/login', 'POST', {email: result.email, password: "testpassword"})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    const googleFailure = (error) => {
        console.log(error)
    }

    return (
        <div style={{
            backgroundColor: "#6065DA",
            height: "100vh",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%"
        }}>
            <Stack spacing={2} style={{alignItems: "center", width: "100%"}}>
                <Stack spacing={6
                } style={{alignItems: "center", width: "100%"}}>
                    <SvgIcon sx={{fontSize: 200, fill: "white"}}>
                        <path
                            d={"M19.8453 24H13.6767C13.6575 23.9132 13.6405 23.8265 13.6191 23.7419C13.5964 23.6303 13.5409 23.5284 13.4599 23.4496C13.379 23.3708 13.2764 23.3188 13.1657 23.3005C12.9897 23.2682 12.8112 23.2522 12.6323 23.2528C10.5711 23.2528 8.50996 23.2723 6.44453 23.2344C4.88372 23.2062 3.39865 22.8342 2.10242 21.8972C0.765651 20.9245 0.0167181 19.6068 0.0465901 17.9032C0.0679272 16.6972 0.522408 15.641 1.26387 14.7094C1.42604 14.5055 1.60207 14.3179 1.78236 14.101C1.28308 13.5054 0.875537 12.8363 0.573617 12.1165C0.190849 11.2012 -0.00200557 10.2155 0.0071164 9.22095C0.00178212 8.35338 -0.0184881 7.47063 0.0476569 6.5998C0.154842 5.13935 0.715157 3.75114 1.64794 2.63501C2.68463 1.34065 4.13923 0.461861 5.7532 0.154842C6.22352 0.0613937 6.70144 0.0131034 7.18066 0.0106089C11.3649 -0.000235753 15.5487 -0.00276616 19.7322 0.00301763H19.9755C19.9875 0.0613209 19.9957 0.120374 20 0.179785C20 1.25449 20 2.3281 20 3.40281C20 3.56873 19.9307 3.6197 19.7866 3.6403C19.3599 3.71839 18.9331 3.81056 18.5117 3.89732L18.4541 3.97757C18.5978 4.07731 18.7327 4.18942 18.8574 4.31267C19.4911 5.03926 19.776 5.90575 19.808 6.86441C19.8517 8.1354 19.9147 9.40964 19.7013 10.672C19.1977 13.6716 16.9872 15.7754 14.1536 16.1442C13.5629 16.2127 12.9687 16.246 12.3741 16.2439C10.8805 16.2569 9.38692 16.2439 7.89332 16.2439C7.46657 16.2439 7.218 16.5432 7.31828 16.9423C7.37589 17.1711 7.50818 17.3262 7.75996 17.3381C7.87518 17.3436 7.9904 17.3512 8.10562 17.3522C9.95235 17.362 11.8023 17.3154 13.6469 17.3956C15.7198 17.4856 17.463 18.3304 18.6963 20.0851C19.2884 20.9288 19.6106 21.8929 19.7461 22.9177C19.7984 23.2712 19.8122 23.6215 19.8453 24ZM9.93528 6.28314C9.03805 6.28314 8.14083 6.30483 7.24467 6.27555C6.57041 6.25494 6.15754 6.77115 6.17141 7.37736C6.18635 8.04431 6.17141 8.71233 6.17675 9.38036C6.18208 10.0484 6.57788 10.4486 7.22546 10.4496C9.0192 10.4554 10.8126 10.4554 12.6056 10.4496C13.2372 10.4496 13.6479 10.0549 13.665 9.4129C13.6842 8.71884 13.6778 8.0237 13.665 7.32856C13.6691 7.18659 13.6441 7.04531 13.5915 6.91373C13.5389 6.78216 13.4598 6.66318 13.3594 6.5644C13.2591 6.46561 13.1395 6.38919 13.0084 6.34002C12.8773 6.29084 12.7376 6.26999 12.5982 6.2788C11.7116 6.30483 10.8229 6.28314 9.93528 6.28314Z"}/>
                    </SvgIcon>
                    <div style={{
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "64px",
                        color: "white",
                        align: "center"
                    }}>
                        <span>Sign in</span>
                    </div>
                    <div style={{
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "white",
                        align: "center"
                    }}>
                        <span>{"If you have not created an account yet, please "}
                            <Link
                                color="#6FE9CD"
                                underline="none"
                                href='/register'
                            >
                                sign up
                            </Link>
                            {" first."}
                        </span>
                    </div>
                </Stack>
                <Stack spacing={2} style={{alignItems: "center", width: "100%"}}>
                    <FormControl sx={{width: "20%"}} variant={"outlined"}>
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-basic"
                            type={"email"}
                            value={form.email}
                            onChange={changeHandler}
                            label="Email"
                            name="email"
                        />
                    </FormControl>
                    <FormControl sx={{width: "20%"}} variant={"outlined"}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
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
                    <Stack style={{alignItems: "center"}} spacing={5} direction="row">
                        <Checkbox/>
                        <div style={{
                            fontFamily: "Montserrat",
                            fontWeight: 500,
                            fontSize: "16px",
                            color: "white",
                            align: "left"
                        }}>
                            <span>Remember me</span>
                        </div>
                        <div style={{
                            fontFamily: "Montserrat",
                            fontWeight: 500,
                            fontSize: "16px",
                            align: "center"
                        }}>
                            <Link color="#6FE9CD" underline="none" href={"/"}>Forgot password?</Link>
                        </div>
                    </Stack>
                    <Box sx={{boxShadow: 3}} style={{width: "20%", borderRadius: 10}}>
                        <CustomButton
                            disabled={loading}
                            onClick={loginHandler}
                            style={{width: "100%"}}
                            variant="contained"
                        >
                            Sign In
                        </CustomButton>
                    </Box>
                    <GoogleLogin
                        clientId={"395298739700-7tp6r19ofpj2hllip8i7vn8mnced5ol0.apps.googleusercontent.com"}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                    />
                </Stack>
            </Stack>
        </div>
    );
}

export default AuthPage