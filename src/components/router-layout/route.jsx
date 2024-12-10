import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../../screens/login-screen";
import RegistrationScreen from "../../screens/registration-screen";
import MainScreen from "../../main-screen";

const route = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path:"/registration",
    element:<RegistrationScreen/>
  },
  {
    path:"/lessons",
    element:<MainScreen/>
  }
]);

export default route;
