import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {DiscussionsList} from "./components/DiscussionsList";
import {useHistory} from "react-router-dom";
import {Box, FormControl, Input, InputLabel, Stack} from "@mui/material";
import CustomButton from "./components/CustomButton";

export const ForumPage = () => {
    const history = useHistory()
    const [discussions, setDiscussions] = useState([])
    const [curDiscussions, setCurDiscussions] = useState([])
    const [filter, setFilter] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const [discussionTheme, setDiscussionTheme] = useState("")

    const changeHandler = event => {
        setDiscussionTheme(event.target.value)
    }

    const filterHandler = event => {
        setFilter(event.target.value)
    }

    const searchHandler = () => {
        const regex = new RegExp(filter, 'i')
        const newDiscussion = discussions.filter(item => {
            return item.theme.search(regex) !== -1
        })
        setCurDiscussions(newDiscussion)
    }

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

    const fetchDiscussions = useCallback(async () => {
        try {
            const fetched = await request('/api/forum', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setDiscussions(fetched)
            setCurDiscussions(fetched)
        } catch (e) {}
    }, [token, request])


    useEffect(() => {
        fetchDiscussions()
    }, [fetchDiscussions])

    if (loading) {
        return <span>wait, please</span>
    }

    return (
        <>
            <h2>Все обсуждения</h2>
            <Box display={"flex"}>
                <Box m={"auto"}>
                    <Stack spacing={3} style={{alignItems: "center"}}>
                        <FormControl variant={"standard"}>
                            <InputLabel htmlFor="standard-adornment-password">Theme</InputLabel>
                            <Input
                                required
                                id="standard-required"
                                value={filter}
                                onChange={filterHandler}
                                label="Theme"
                                variant="standard"
                                name="theme"
                            />
                        </FormControl>

                        <Box sx={{boxShadow: 3}} style={{borderRadius: 10}}>
                            <CustomButton
                                disabled={loading}
                                onClick={searchHandler}
                                style={{width: "100%"}}
                                variant="contained"
                            >
                                Search
                            </CustomButton>
                        </Box>
                    </Stack>
                </Box>
            </Box>
            {!loading && <DiscussionsList discussions={curDiscussions} />}
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