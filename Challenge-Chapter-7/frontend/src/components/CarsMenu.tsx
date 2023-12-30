import React from "react";

interface CarsMenuProps {
  active: boolean;
}

const CarsMenu: React.FC<CarsMenuProps> = ({ active }) => {
  const handleClick = () => {
    window.location.href = "/cars";
  };
  return (
    <button
      className={`w-full h-16 border-none mt-2 flex flex-col items-center justify-center py-2 ${
        active ? "bg-[#FFFFFF4D]" : "bg-[#0d28a6] hover:bg-[#FFFFFF4D]"
      }`}
      onClick={handleClick}
    >
      <img src="/images/truck.png" alt="" />
      <p className="text-white text-[0.625rem] mt-[0.125rem] mb-0">Cars</p>
    </button>
  );
};

export default CarsMenu;
