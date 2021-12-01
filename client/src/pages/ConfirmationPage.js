import {Link, useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {useHttp} from "../hooks/http.hook";

function ConfirmationPage() {
    const token = useParams().token
    const {request} = useHttp()

    const getToken = useCallback(async() => {
        try {
            const fetched = await request(`/api/auth/confirmation/${token}`, 'GET', null)
        } catch (e) {

        }
    }, [token,  request])

    useEffect(() => {
        getToken()
    }, [getToken])

    return <>
        <p>Вы подтвердили свой аккаунт</p>
        <Link to={"/"}>Вернуться на главную</Link>
    </>
}

export default ConfirmationPage