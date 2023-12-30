import React from "react";

interface SizeInputProps {
  value: string;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SizeInput: React.FC<SizeInputProps> = ({ value, handleSelectChange }) => {
  console.log(value);
  return (
    <div className="w-full flex mt-4">
      <label className="mb-0 w-1/5 py-2" htmlFor="size">
        Ukuran<span className="text-[#FA2C5A]">*</span>
      </label>
      <div className="grow">
        <select
          id="size"
          className="w-1/2 h-full bg-white border-2 border-[#D0D0D0] text-[#8A8A8A] px-3 py-2.5"
          name="size"
          onChange={handleSelectChange}
          value={value}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
    </div>
  );
};

export default SizeInput;
