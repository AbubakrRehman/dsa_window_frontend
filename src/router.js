import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Signup from "./components/Signup/Signup";
import LogIn from "./components/Login/LogIn";
import NotFound from "./components/NotFound/NotFound";
import UsersPage from "./components/UsersPage/UsersPage";
import UserDetail from "./components/UserDetail/UserDetail";
import Topics from "./components/Topics/Topics";
import UserQuestionsPage from "./components/UserQuestionsPage/UserQuestionsPage";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Home from "./components/Home/Home"
import QuestionsPage from "./components/QuestionsPage/QuestionsPage";
import Profile from "./components/Profile/Profile";
import AuthenticatedLayout from "./components/AuthenticationLayout/AuthenticatedLayout";
import UnauthenticatedLayout from "./components/UnauthenticatedLayout/UnauthenticatedLayout";
import Practice from "./components/practice/Practice";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                element: <UnauthenticatedLayout />,
                children: [
                    {
                        path: "signup",
                        element: <Signup />
                    },
                    {
                        path: "login",
                        element: <LogIn />

                    },
                ]
            },
            {
                element: <AuthenticatedLayout />,
                children: [
                    {
                        index: true,
                        element: <Home />
                    },
                    {
                        path: "topics/:topicId/questions",
                        element: <UserQuestionsPage />
                    },
                    {
                        path: "admin/topics",
                        element: <Topics />
                    },
                    {
                        path: "admin/topics/:topicId/questions",
                        element: <QuestionsPage />
                    },
                    {
                        path: "admin/users",
                        element: <UsersPage />
                    },
                    {
                        path: "admin/users/:userId",
                        element: <UserDetail />
                    },
                    {
                        path: "admin",
                        element: <AdminDashboard />
                    },
                    {
                        path: "/profile",
                        element: <Profile />
                    },

                ]
            },
            {
                path: "*",
                element: <NotFound />
            },
            {
                path: "/practice",
                element: <Practice />
            },
        ]
    }
]);

export { router };