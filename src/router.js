import { createBrowserRouter } from "react-router-dom";
import {lazy} from "react";
import Root from "./components/Root";
import Signup from "./pages/Signup/Signup";
import LogIn from "./pages/Login/LogIn";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import AuthenticatedLayout from "./pages/AuthenticationLayout/AuthenticatedLayout";
import UnauthenticatedLayout from "./pages/UnauthenticatedLayout/UnauthenticatedLayout";
import Practice from "./components/practice/Practice";
// import UserDetail from "./pages/UserDetail/UserDetail";

//lazy load
const UsersPage = lazy(() => import("./pages/UsersPage/UsersPage"));
const UserDetail = lazy(() => import("./pages/UserDetail/UserDetail"));
const Topics = lazy(() => import("./pages/Topics/Topics"));
const UserQuestionsPage = lazy(() => import("./pages/UserQuestionsPage/UserQuestionsPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard/AdminDashboard"));
const QuestionsPage = lazy(() => import("./pages/QuestionsPage/QuestionsPage"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));

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
                    {
                        path: "/forget-password",
                        element: <ForgotPassword/>
                    }
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
            {
                path: "/reset-password/:token",
                element: <ResetPassword/>
            }
        ]
    }
]);

export { router };