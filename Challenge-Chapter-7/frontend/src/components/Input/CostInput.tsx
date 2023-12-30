import React from "react";

interface CostInputProps {
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CostInput: React.FC<CostInputProps> = ({ value, handleInputChange }) => {
  return (
    <div className="w-full flex mt-4">
      <label className="mb-0 w-1/5 py-2" htmlFor="cost">
        Harga<span className="text-[#FA2C5A]">*</span>
      </label>
      <div className="grow">
        <input
          id="cost"
          type="number"
          name="cost"
          className="w-1/2 h-full bg-white border-2 border-[#D0D0D0] text-[#8A8A8A] px-3 py-2.5"
          placeholder="Rp 0.-"
          onChange={handleInputChange}
          value={value}
          required
        />
      </div>
    </div>
  );
};

export default CostInput;
