import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import {Profile} from "./components/Profile";

function ProfilePage() {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [user, setUser] = useState(null)
    const userId = useParams().id

    const getUser = useCallback(async () => {
        try {
            console.log(token)
            const fetched = await request(`/api/profile/${userId}`, 'GET', null,{
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
        } catch (e) {}
    }, [token, userId, request])

    useEffect(() => {
        getUser()
    }, [getUser])

    if (loading) {
        return <span>wait, please</span>
    }

    return (
        <>
            <h2>Профиль</h2>
            {!loading && user && <Profile user={user} request={request} />}
        </>
    )
}

export default ProfilePage