import React from 'react'
import {Link} from "react-router-dom";
import {Box} from "@material-ui/core";

export const CoursesList = ({courses}) => {
    if (!courses.length) {
        return <span>Курсов пока нет</span>
    }

    if (courses.length) {
        console.log(courses[0])
    }

    return (
        <Box display={"flex"}>
            <Box m={"auto"}>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Id курса</th>
                        <th>Название курса</th>
                        <th>Id владельца</th>
                        <th>Имя владельца</th>
                        <th>Email владельца</th>
                        <th>Открыть</th>
                    </tr>
                    </thead>

                    <tbody>
                    {courses.map((course, index) =>
                        <tr key={course._id}>
                            <td>{index + 1}</td>
                            <td>{course._id}</td>
                            <td>{course.name}</td>
                            <td>{course.owner._id}</td>
                            <td>{course.owner.firstName + " " + course.owner.lastName}</td>
                            <td>{course.owner.email}</td>
                            <td>
                                <Link to={`/course/${course._id}`}>Открыть</Link>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </Box>
        </Box>
    )
}