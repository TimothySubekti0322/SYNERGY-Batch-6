import { PropsWithChildren, useEffect, useState } from "react";
import axios from "axios";
import { API_PRODUCTION } from "../data/API";

export default function PrivateProvider({ children }: PropsWithChildren) {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${API_PRODUCTION}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (
          response.data[0].role == "superadmin" ||
          response.data[0].role == "admin"
        ) {
          setShow(true);
        } else {
          window.location.href = "/userPage";
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!token) {
      window.location.href = "/login";
    } else {
      getUserData();
    }
  }, [token]);

  if (show) {
    return children;
  }

  return <></>;
}
