import {AuthContext} from "../context/AuthContext";
import {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {Discussion} from "./components/Discussion";


function DiscussionPage() {
    const {token, userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [discussion, setDiscussion] = useState(null)
    const [messages, setMessages] = useState(null)
    const discussionId = useParams().id

    const getDiscussion = useCallback(async() => {
        try {
            const fetched = await request(`/api/forum/${discussionId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            setDiscussion(fetched.discussion)
            setMessages(fetched.messages)
        } catch (e) {

        }
    }, [token, discussionId, request])

    useEffect(() => {
        getDiscussion().then().catch()
    }, [getDiscussion])

    if (loading) {
        return <span>wait, please</span>
    }

    return(
        <>
            {!loading && discussion && messages && <Discussion discussion={discussion} messages={messages}/>}
        </>
    )
}

export default DiscussionPage