import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {CoursesList} from "./components/CoursesList";
import {Box, FormControl, Input, InputLabel, Stack} from "@mui/material";
import CustomButton from "./components/CustomButton";

export const MyCoursesPage = () => {
    const [courses, setCourses] = useState([])
    const [curCourses, setCurCourses] = useState([])
    const [filter, setFilter] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const filterHandler = event => {
        setFilter(event.target.value)
    }

    const createHandler = () => {
        const regex = new RegExp(filter, 'i')
        const newCourses = courses.filter(item => {
            return item.name.search(regex) !== -1
        })
        setCurCourses(newCourses)
    }

    const fetchCourses = useCallback(async () => {
        try {
            const fetched = await request('/api/course/mycourses', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setCourses(fetched)
            setCurCourses(fetched)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    if (loading) {
        return <span>wait, please</span>
    }

    return (
        <>
            <h2>Мои курсы</h2>
            <Box display={"flex"}>
                <Box m={"auto"}>
                    <Stack spacing={3} style={{alignItems: "center"}}>
                        <FormControl variant={"standard"}>
                            <InputLabel htmlFor="standard-adornment-password">Course Name</InputLabel>
                            <Input
                                required
                                id="standard-required"
                                value={filter}
                                onChange={filterHandler}
                                label="Course Name"
                                variant="standard"
                                name="courseName"
                            />
                        </FormControl>

                        <Box sx={{boxShadow: 3}} style={{borderRadius: 10}}>
                            <CustomButton
                                disabled={loading}
                                onClick={createHandler}
                                style={{width: "100%"}}
                                variant="contained"
                            >
                                Search
                            </CustomButton>
                        </Box>
                    </Stack>
                </Box>
            </Box>
            {!loading && <CoursesList courses={curCourses}/>}
        </>
    )
}