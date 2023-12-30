import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";

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
    element: (
      <div className="w-screen h-screen flex justify-center items-center text-white font-bold">
        COMING SOON
      </div>
    ),
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
