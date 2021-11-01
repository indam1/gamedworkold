import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {CoursesList} from "./components/CoursesList";

export const CoursesPage = () => {
    const [courses, setCourses] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchCourses = useCallback(async () => {
        try {
            const fetched = await request('/api/course/courses', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setCourses(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    if (loading) {
        return <span>wait, please</span>
    }

    return (
        <>
            <h2>Все курсы</h2>
            {!loading && <CoursesList courses={courses} />}
        </>
    )
}