import React from "react";

interface NameInputProps {
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput: React.FC<NameInputProps> = ({ value, handleInputChange }) => {
  return (
    <div className="w-full flex">
      <label className="mb-0 w-1/5 py-2" htmlFor="name">
        Nama<span className="text-[#FA2C5A]">*</span>
      </label>
      <div className="grow">
        <input
          id="name"
          type="text"
          name="name"
          className="w-1/2 h-full bg-white border-2 border-[#D0D0D0] text-[#8A8A8A] px-3 py-2.5"
          placeholder="Avanza"
          onChange={handleInputChange}
          value={value}
          required
        />
      </div>
    </div>
  );
};

export default NameInput;
