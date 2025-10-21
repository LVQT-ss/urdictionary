import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import AdminLayout from "../components/Admin/AdminLayout";
import Home from "../pages/Home";
import Dictionary from "../pages/Dictionary";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Premium from "../pages/Premium";
import Profile from "../pages/Profile";
import VocabularyDetail from "../pages/VocabularyDetail";
import UserManagement from "../pages/Admin/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dictionary",
        element: <Dictionary />,
      },
      {
        path: "vocabulary/:id",
        element: <VocabularyDetail />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "premium",
        element: <Premium />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "users",
            element: <UserManagement />,
          },
        ],
      },
    ],
  },
]);

export default router;
