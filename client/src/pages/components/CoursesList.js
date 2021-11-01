import React from 'react'
import {Link} from "react-router-dom";
import {Box} from "@material-ui/core";

export const CoursesList = ({courses}) => {
    if (!courses.length) {
        return <span>Курсов пока нет</span>
    }

    return (
        <Box display={"flex"}>
            <Box m={"auto"}>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Id владельца</th>
                        <th>Открыть</th>
                    </tr>
                    </thead>

                    <tbody>
                    {courses.map((course, index) => {
                        return (
                            <tr key={course._id}>
                                <td>{index + 1}</td>
                                <td>{course.owner}</td>
                                <td>
                                    <Link to={`/course/${course._id}`}>Открыть</Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </Box>
        </Box>
    )
}