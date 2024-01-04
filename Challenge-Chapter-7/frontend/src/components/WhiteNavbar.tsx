import React from "react";

interface WhiteNavbarProps {
  title1: string | null;
  title2: string | null;
}

const WhiteNavbar: React.FC<WhiteNavbarProps> = ({ title1, title2 }) => {
  return (
    <section
      id="white-navbar"
      className={`w-[12rem] flex flex-col ${title1 ? "py-2" : ""}`}
    >
      <div className="h-16 w-full flex items-center ">
        <div className="font-bold py-2 w-full pl-4 text-[#8A8A8A]">
          {title1}
        </div>
      </div>
      <div className="h-16 w-full flex items-center mt-4">
        <div
          className={`bg-[#CFD4ED] font-bold ${
            title2 ? "py-2" : ""
          } w-full pl-4 text-black`}
        >
          {title2}
        </div>
      </div>
    </section>
  );
};

export default WhiteNavbar;
