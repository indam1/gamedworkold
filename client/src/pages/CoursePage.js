import {AuthContext} from "../context/AuthContext";
import {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {Course} from "./components/Course";


function CoursePage() {
    const {token, userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [course, setCourse] = useState(null)
    const courseId = useParams().id

    const getCourse = useCallback(async() => {
        try {
            const fetched = await request(`/api/course/${courseId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setCourse(fetched)
        } catch (e) {
            
        }
    }, [token, courseId, request])

    useEffect(() => {
        getCourse()
    }, [getCourse])

    if (loading) {
        return <span>wait, please</span>
    }

    return(
        <>
            {!loading && course && <Course isOwner={userId === course.owner} course={course}/>}
        </>
    )
}

export default CoursePage