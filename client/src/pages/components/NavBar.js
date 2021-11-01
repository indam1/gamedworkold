import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import {Stack} from "@mui/material";
import {Button} from "@material-ui/core";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const url = "/profile/" + auth.userId

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/login')
    }

    return (
        <Stack spacing={"8vw"} direction={"row"} justifyContent={"center"}>
            <Button component={Link} to={"/"}>
                Главная
            </Button>
            <Button component={Link} to={url}>
                Личный кабинет
            </Button>
            <Button component={Link} to={'/courses'}>
                Все курсы
            </Button>
            <Button component={Link} to={'/mycourses'}>
                Мои курсы
            </Button>
            <Button component={Link} to={'/create'}>
                Создать
            </Button>
            <Button component={Link} to={'/forum'}>
                Форум
            </Button>
            <Button onClick={logoutHandler} component={Link} to={'/'}>
                Выйти
            </Button>
        </Stack>
)}