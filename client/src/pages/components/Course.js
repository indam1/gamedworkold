import React from 'react'
import {Box} from "@material-ui/core";
import {NavLink} from "react-router-dom";

export const Course = ({isOwner, course}) => {
    const url = "/create/" + course._id
    return (
        <>
            <h2>Курс</h2>

            <Box display={"flex"}>
                <Box m={"auto"}>
                    <p>Название: {course.name}</p>
                    <p>Владелец: {course.owner}</p>
                    <p>Id: {course._id}</p>

                    {isOwner && <NavLink to={url}>Edit</NavLink>}
                </Box>
            </Box>
        </>
    )
}