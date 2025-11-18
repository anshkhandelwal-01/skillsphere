import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import CatalogPage from "../pages/Catalog/CatalogPage";
import MyLearningPage from "../pages/MyLearning/MyLearningPage";
import AssessmentsPage from "../pages/Assessments/AssessmentsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import ResourcesPage from "../pages/Resources/ResourcesPage";
import AdminDashboardPage from "../pages/Admin/AdminDashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import ErrorPage from "../pages/ErrorPage";
import ChangePassword from "../components/common/ChangePassword";
import { CourseModule } from "../pages/Modules/CourseModule";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },

  // Protected routes with shared layout
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/my-learning", element: <MyLearningPage /> },
      { path: "/assessments", element: <AssessmentsPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/resources", element: <ResourcesPage /> },
      { path: "/modules/:courseId", element: <CourseModule /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute roles={["LEAD", "ADMIN"]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute roles={["LEAD", "ADMIN"]}>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      { path: "/change-password", element: <ChangePassword /> },
    ],
  },
]);

export default function RootRouter() {
  return <RouterProvider router={router} />;
}
