const UserPage = () => {
  const SignOutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-white font-bold">
      COMING SOON
      <button
        className="bg-white text-black font-bold hover:bg-[#CCCCCC] mt-8"
        onClick={SignOutHandler}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserPage;
