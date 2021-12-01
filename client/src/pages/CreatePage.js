import React, {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {Box, FormControl, Input, InputLabel, Stack} from "@mui/material";
import CustomButton from "./components/CustomButton";

function CreatePage() {
    const history = useHistory()
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)

    const [nameCourse, setNameCourse] = useState("");

    const changeHandler = event => {
        setNameCourse(event.target.value)
    }

    const createHandler = async () => {
        try {
            const data = await request('/api/course/create', 'POST', {name: nameCourse}, {
                Authorization: `Bearer ${token}`
            })
            console.log("Data: ", data.course);
            const url = "/create/" + data.course._id
            history.push(url)
        } catch (e) {
        }
    }

    return (
        <>
            <h2>Создать курс</h2>
            <Box display={"flex"}>
                <Box m={"auto"}>
                    <Stack spacing={3} style={{alignItems: "center"}}>
                        <FormControl variant={"standard"}>
                            <InputLabel htmlFor="standard-adornment-password">Course Name</InputLabel>
                            <Input
                                required
                                id="standard-required"
                                value={nameCourse}
                                onChange={changeHandler}
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
                                Create Course
                            </CustomButton>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    );
}

export default CreatePage