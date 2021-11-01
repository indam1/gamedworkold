import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";
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