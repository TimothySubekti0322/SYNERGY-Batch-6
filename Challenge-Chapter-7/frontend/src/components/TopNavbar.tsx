import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { API_PRODUCTION } from "../data/API";

const TopNavbar = () => {
  const [isChevronDown, setIsChevronDown] = useState<boolean>(true);

  // Get User Data
  const [username, setUsername] = useState<string>();
  const [char, setChar] = useState<string>();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${API_PRODUCTION}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsername(response.data[0].username);
        setChar(response.data[0].username.charAt(0));
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  // Sign Out Button
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <section id="top-navbar" className="h-[4.5rem] flex relative">
      {/* <!-- Silver rectangle --> */}
      <div className="w-[12rem] bg-white p-4">
        <div className="w-1/2 h-full bg-[#CFD4ED]"></div>
      </div>

      {/* <!-- Right side --> */}
      <div className="grow flex justify-between py-3 px-5 items-center">
        {/* <!-- Hamburger Icon --> */}
        <img src="/images/hamburger_icon.png" alt="" />

        {/* <!-- Right groups --> */}
        <div className="flex h-full items-center">
          <div id="search-container" className="flex">
            <input
              type="text"
              placeholder="Search"
              className="bg-white border-[#D0D0D0] border-2 text-[#D0D0D0] pl-4"
            />
            <button
              id="search-btn"
              className="m-0 inline-block border-[#0D28A6] border-2 text-[#0D28A6] rounded bg-transparent font-bold text-[0.75rem]"
            >
              Search
            </button>
          </div>
          <div
            id="profile-icon"
            className="border-none bg-[#cfd4ed] rounded-[50%] py-2 px-3 font-bold ml-4 text-black"
          >
            {char}
          </div>
          <p className="ml-4 my-0 text-black">{username}</p>
          <button
            className="bg-white p-0 border-0 hover:border-0 focus:outline-none active:border-0 ml-4"
            onClick={() => setIsChevronDown(!isChevronDown)}
          >
            {isChevronDown ? (
              <FaChevronDown className="text-black" />
            ) : (
              <FaChevronUp className="text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        className={`absolute right-0 top-[4.05rem] w-32 text-black text-center bg-white rounded-none focus:outline-none hover:outline-none hover:bg-[#C70039] hover:text-white ${
          isChevronDown && "hidden"
        }`}
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </section>
  );
};

export default TopNavbar;
