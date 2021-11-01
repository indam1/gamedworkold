import React, {useContext, useState} from 'react'
import {Box} from "@material-ui/core";
import {ButtonUnstyled, buttonUnstyledClasses, FormControl, Input, InputLabel, Stack} from "@mui/material";
import styled from "@emotion/styled";
import {useHttp} from "../../hooks/http.hook";
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

export const Discussion = ({discussion, messages}) => {
    const [text, setText] = useState("")
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const history = useHistory()

    const textHandler = event => {
        setText(event.target.value)
    }

    const send = async () => {
        try {
            const data = await request(`/api/forum/send/${discussion._id}`, 'POST', {text: text}, {
                Authorization: `Bearer ${token}`
            })
            console.log("Data: ", data)
            window.location.reload()
        } catch (e) {}
    }

    return (
        <>
            <h2>Курс</h2>

            <Box display={"flex"}>
                <Box m={"auto"}>
                    <p>Id: {discussion._id}</p>
                    <p>Тема: {discussion.theme}</p>
                    <p>Создатель: {discussion.creator}</p>

                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Id владельца</th>
                            <th>Текст</th>
                        </tr>
                        </thead>

                        <tbody>
                        {messages.map((message, index) => {
                            return (
                                <tr key={message._id}>
                                    <td>{index + 1}</td>
                                    <td>{message.sender}</td>
                                    <td>{message.text}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    <Stack spacing={3} style={{alignItems: "center"}}>
                        <FormControl variant={"standard"}>
                            <InputLabel htmlFor="standard-adornment-password">Text</InputLabel>
                            <Input
                                required
                                id="standard-required"
                                value={text}
                                onChange={textHandler}
                                label="Text"
                                variant="standard"
                                name="text"
                            />
                        </FormControl>

                        <Box sx={{boxShadow: 3}} style={{borderRadius: 10}}>
                            <CustomButton
                                disabled={loading}
                                onClick={send}
                                style={{width: "100%"}}
                                variant="contained"
                            >
                                Send
                            </CustomButton>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}