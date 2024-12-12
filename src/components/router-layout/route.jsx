import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../../screens/login-screen";
import RegistrationScreen from "../../screens/registration-screen";
import MainScreen from "../../main-screen";
import ErrorScreen from "../common/error-screen";
import LessonsScreen from "../../screens/lessons-screen";
import VocabularyScreen from "../../screens/vocabulary-screen";
import AdminPrivateRoute from "../auth-layout/admin-private-route";
import UserPrivateRoute from "../auth-layout/user-private-route";
import DashboardScreen from "../../screens/admin/dashboard-screen";
import ContentManagementScreen from "../../screens/admin/content-management-screen";
import UserManagementScreen from "../../screens/admin/user-management-screen";
import TutorialScreen from "../../screens/tutorial-screen";
import AddVocabularyScreen from "../../screens/admin/add-vocubulary-screen";

const route = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/registration",
    element: <RegistrationScreen />,
  },
  {
    path: "/lessons",
    element: (
      <UserPrivateRoute>
        <MainScreen />
      </UserPrivateRoute>
    ),
    children: [
      {
        path: "/lessons",
        element: (
          <UserPrivateRoute>
            <LessonsScreen />
          </UserPrivateRoute>
        ),
      },
      {
        path: "vocabulary",
        element: (
          <UserPrivateRoute>
            <VocabularyScreen />
          </UserPrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AdminPrivateRoute>
            <DashboardScreen />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <AdminPrivateRoute>
            <ContentManagementScreen />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminPrivateRoute>
            <UserManagementScreen />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "tutorial",
        element: (
          <UserPrivateRoute>
            <TutorialScreen />
          </UserPrivateRoute>
        ),
      },
      {
        path: "add-vocabulary",
        element: (
          <AdminPrivateRoute>
            <AddVocabularyScreen />
          </AdminPrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorScreen />,
  },
]);

export default route;
