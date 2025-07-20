import { createBrowserRouter } from "react-router";
import { MainLayout } from "@/components/MainLayout";
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import MoodyPage from "@/pages/Moody";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/moody",
        element: <MoodyPage />,
      },
    ],
  },
]);

export default router;
