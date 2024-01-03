import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";

interface DeleteButtonProps {
  carId: number;
  handleOpen: (id: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ carId, handleOpen }) => {
  const [deleteBtnHovered, setDeleteBtnHovered] = useState(false);
  return (
    <button
      className="border-[#FA2C5A] border-2 bg-white flex items-center justify-center gap-x-2 w-[45%] py-3 hover:bg-[#FA2C5A] text-[#FA2C5A] hover:text-white hover:border-[#FA2C5A]"
      onMouseEnter={() => setDeleteBtnHovered(true)}
      onMouseLeave={() => setDeleteBtnHovered(false)}
      onClick={() => handleOpen(carId)}
    >
      <div className="w-4 h-4">
        {deleteBtnHovered ? (
          <FiTrash
            style={{
              color: "white",
              fontSize: "1.05rem",
            }}
          />
        ) : (
          <FiTrash
            style={{
              color: "#FA2C5A",
              fontSize: "1.05rem",
            }}
          />
        )}
      </div>
      <p className="">Delete</p>
    </button>
  );
};

export default DeleteButton;
