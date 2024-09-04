import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Main from "./layouts/Main";
import Indexprofile from "./Pages/Profile/Indexprofile";
import AuthProvider from "./providers/AuthProvider";
import AdminIndex from "./Pages/admin/AdminIndex";
import Details from "./Pages/Details";
import SavedIndex from "./Pages/SavedProducts/SavedIndex";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: (
            <AuthProvider>
              <Home />,
            </AuthProvider>
          ),
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
        {
          path: "/admin",
          element: (
            <AuthProvider>
              <AdminIndex />
            </AuthProvider>
          ),
        },
        {
          path: "/product/:productID",
          element: <Details />,
        },
        {
          path: "/saved-products",
          element: (
            <AuthProvider>
              <SavedIndex />
            </AuthProvider>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
