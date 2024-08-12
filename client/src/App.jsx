import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Main from "./layouts/Main";
import Indexprofile from "./Pages/Profile/Indexprofile";
import AuthProvider from "./providers/AuthProvider";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: (
            <AuthProvider>
              <Indexprofile />
            </AuthProvider>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
