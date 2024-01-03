import React from "react";

interface DashboardMenuProps {
  active: boolean;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({ active }) => {
  const handleClick = () => {
    window.location.href = "/";
  };
  return (
    <button
      className={`w-full h-16 border-none mt-2 flex flex-col items-center p-0 py-2 ${
        active ? "bg-[#FFFFFF4D]" : "bg-[#0d28a6] hover:bg-[#FFFFFF4D]"
      }`}
      onClick={handleClick}
    >
      <img src="/images/house.png" alt="" />
      <p className="text-center text-white text-[0.625rem] mt-[0.125rem] font-bold mb-0 w-fit">
        Dashboard
      </p>
    </button>
  );
};

export default DashboardMenu;
