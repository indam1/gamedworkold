import React from 'react'
import {Link} from "react-router-dom";
import {Box} from "@material-ui/core";

export const DiscussionsList = ({discussions}) => {
    if (!discussions.length) {
        return <span>Обсуждений пока нет</span>
    }

    return (
        <Box display={"flex"}>
            <Box m={"auto"}>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Id создателя</th>
                        <th>Тема</th>
                        <th>Открыть</th>
                    </tr>
                    </thead>

                    <tbody>
                    {discussions.map((discussion, index) => {
                        return (
                            <tr key={discussion._id}>
                                <td>{index + 1}</td>
                                <td>{discussion.creator}</td>
                                <td>{discussion.theme}</td>
                                <td>
                                    <Link to={`/forum/${discussion._id}`}>Открыть</Link>
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