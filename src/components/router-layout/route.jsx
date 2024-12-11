import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../../screens/login-screen";
import RegistrationScreen from "../../screens/registration-screen";
import MainScreen from "../../main-screen";
import ErrorScreen from "../common/error-screen";
import LessonsScreen from "../../screens/lessons-screen";
import VocabularyScreen from "../../screens/vocabulary-screen";

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
    element: <MainScreen />,
    children: [
      {
        path: "/lessons",
        element: <LessonsScreen />,
      },
      { 
        path: "vocabulary", 
        element: <VocabularyScreen /> 
      },
    ],
  },
  { 
    path: "*", 
    element: <ErrorScreen /> 
  },
]);

export default route;
