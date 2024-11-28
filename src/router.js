import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Bookmark from "./components/Bookmark";
import Home from "./components/Home";
import Signup from "./components/auth/signup";
import { Navbar } from "react-bootstrap";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'Bookmark', element: <PrivateRoute element={Bookmark} />},
    { path: 'signup', element:<Signup/>},
    {path: 'login', element: <Login/>},
    {path: 'logout', element: <Logout/>},
    { path: 'home',element: <PrivateRoute element={Home} />  },
    {path: 'navbar', element: <Navbar/>}
]);
export default router;