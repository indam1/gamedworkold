import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {DiscussionsList} from "./components/DiscussionsList";
import {useHistory} from "react-router-dom";
import {Box, ButtonUnstyled, buttonUnstyledClasses, FormControl, Input, InputLabel, Stack} from "@mui/material";
import styled from "@emotion/styled";

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

export const ForumPage = () => {
    const history = useHistory()
    const [discussions, setDiscussions] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const [discussionTheme, setDiscussionTheme] = useState("")

    const changeHandler = event => {
        setDiscussionTheme(event.target.value)
    }

    const fetchDiscussions = useCallback(async () => {
        try {
            const fetched = await request('/api/forum', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setDiscussions(fetched)
        } catch (e) {}
    }, [token, request])

    const createDiscussion = async () => {
        try {
            const data = await request('/api/forum/create', 'POST', {theme: discussionTheme}, {
                Authorization: `Bearer ${token}`
            })
            console.log("Data: ", data.discussion);
            const url = "/forum/" + data.discussion._id
            history.push(url)
        } catch (e) {}
    }

    useEffect(() => {
        fetchDiscussions()
    }, [fetchDiscussions])

    if (loading) {
        return <span>wait, please</span>
    }

    return (
        <>
            <h2>Все обсуждения</h2>
            {!loading && <DiscussionsList discussions={discussions} />}
            <Box display={"flex"}>
                <Box m={"auto"}>
                    <Stack spacing={3} style={{alignItems: "center"}}>
                        <FormControl variant={"standard"}>
                            <InputLabel htmlFor="standard-adornment-password">Theme</InputLabel>
                            <Input
                                required
                                id="standard-required"
                                value={discussionTheme}
                                onChange={changeHandler}
                                label="Theme"
                                variant="standard"
                                name="theme"
                            />
                        </FormControl>

                        <Box sx={{boxShadow: 3}} style={{borderRadius: 10}}>
                            <CustomButton
                                disabled={loading}
                                onClick={createDiscussion}
                                style={{width: "100%"}}
                                variant="contained"
                            >
                                Create Discussion
                            </CustomButton>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}