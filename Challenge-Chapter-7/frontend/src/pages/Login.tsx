import React, { useState, FormEvent } from "react";
import PublicProvider from "../providers/PublicProvider";
import axios from "axios";
import { API_PRODUCTION } from "../data/API";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post(`${API_PRODUCTION}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response?.data?.token);
      const role = response.data.role;
      if (role == "superadmin" || role == "admin") {
        window.location.href = "/";
      } else {
        window.location.href = "/userPage";
      }
    } catch {
      setError(true);
    }
  };
  return (
    <PublicProvider>
      <div className="w-screen h-screen flex bg-white text-black">
        {/* Image Section */}
        <div className="w-[60%] relative">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
          <img
            src="/images/loginBG.png"
            alt="login Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-1 flex-col px-8 justify-center">
          <div className="w-[30%] h-[3rem] bg-[#CFD4ED]"></div>
          <p className="font-bold text-2xl mt-8">Welcome, Admin BCR</p>
          {/* Error Message */}
          {error && (
            <div className="p-6 bg-[#D00C1A] bg-opacity-10 text-[#D00C1A] mt-8">
              Masukkan username dan password yang benar. Perhatikan penggunaan
              huruf kapital.
            </div>
          )}
          <form className="mt-8" onSubmit={handleSubmit}>
            <label className="block">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="bg-white border-2 border-black border-opacity-10 rounded-xl py-2 px-4 w-full mt-4"
              placeholder="contoh: johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block mt-4">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-white border-2 border-black border-opacity-10 rounded-xl py-2 px-4 w-full mt-4"
              placeholder="6+ karakter"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-[#0D28A6] text-white mt-8">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </PublicProvider>
  );
};

export default Login;
