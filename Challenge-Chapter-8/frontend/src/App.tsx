import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import UserPage from "./pages/UserPage";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cars",
    element: <Cars />,
  },
  {
    path: "/addCar",
    element: <AddCar />,
  },
  {
    path: "/editCar/:id",
    element: <EditCar />,
  },
  {
    path: "/userPage",
    element: <UserPage />,
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
