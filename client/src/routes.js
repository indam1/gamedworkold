import {Redirect, Route, Switch} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import MakeCoursePage from "./pages/MakeCoursePage";
import AuthPage from "./pages/AuthPage";
import RegPage from "./pages/RegPage";
import {Navbar} from "./pages/components/NavBar";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import {CoursesPage} from "./pages/CoursesPage";
import {MyCoursesPage} from "./pages/MyCoursesPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import CreatePage from "./pages/CreatePage";
import {ForumPage} from "./pages/ForumPage";
import DiscussionPage from "./pages/DiscussionPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <Navbar/>
                    <HomePage/>
                </Route>
                <Route path="/profile/:id">
                    <Navbar/>
                    <ProfilePage/>
                </Route>
                <Route path="/courses" exact>
                    <Navbar/>
                    <CoursesPage/>
                </Route>
                <Route path="/mycourses" exact>
                    <Navbar/>
                    <MyCoursesPage/>
                </Route>
                <Route path="/course/:id" >
                    <Navbar/>
                    <CoursePage/>
                </Route>
                <Route path="/create" exact>
                    <Navbar/>
                    <CreatePage/>
                </Route>
                <Route path="/forum" exact>
                    <Navbar/>
                    <ForumPage/>
                </Route>
                <Route path="/forum/:id" >
                    <Navbar/>
                    <DiscussionPage/>
                </Route>
                <Route path="/create/:id" >
                    <MakeCoursePage/>
                </Route>
                <Route path="/confirmation/:token" >
                    <Navbar/>
                    <ConfirmationPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <AuthPage/>
            </Route>
            <Route path="/register" exact>
                <RegPage/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}