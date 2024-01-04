import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import { SelectChangeEvent } from "@mui/material/Select";
import limit from "../data/limit";

interface PaginationDropdownProps {
  dataLength: number;
  totalPage: number;
  limitData: number;
  limitChange: (newLimit: number) => void;
  setTotalPage: (newTotalPage: number) => void;
  dataChange: (page: number) => void;
}

const PaginationDropdown: React.FC<PaginationDropdownProps> = ({
  dataLength,
  totalPage,
  limitData,
  limitChange,
  setTotalPage,
  dataChange,
}) => {
  // total Page
  const [totalPageValue, setTotalPageValue] = useState(totalPage);

  // Limit Data
  const [limitDataValue, setLimitDataValue] = useState<number[]>(
    Array.from({ length: totalPage }, (_, i) => i + 1)
  );

  // Limit
  const [limitValue, setLimitValue] = useState(limitData);

  // Limit Handle
  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimitValue(parseInt(event.target.value));
    const newTotalPage = Math.ceil(dataLength / parseInt(event.target.value));
    setTotalPageValue(newTotalPage);
    setLimitDataValue(Array.from({ length: newTotalPage }, (_, i) => i + 1));
  };

  // jump Page
  const [jumpPageValue, setJumpPageValue] = useState(1);

  // Jump Page Handle
  const handleJumpPageChange = (event: SelectChangeEvent) => {
    setJumpPageValue(parseInt(event.target.value));
  };

  // Clicked
  const [clicked, setClicked] = useState(false);

  // Submit Handler
  const handleSubmit = async () => {
    setClicked(true);
    limitChange(limitValue);
  };

  useEffect(() => {
    dataChange(jumpPageValue);
    setTotalPage(totalPageValue);
    setClicked(false);
  }, [limitData, clicked]);

  return (
    <div className="flex w-1/2">
      {/* Limit Select */}
      <div className="flex flex-col w-1/4">
        <p className="mb-2">Limit</p>
        <Dropdown
          value={limitValue}
          handleChange={handleLimitChange}
          data={limit}
        />
      </div>

      {/* Jump to Page Select */}
      <div className="flex flex-col w-1/4 ml-4">
        <p className="mb-2">Jump to page</p>
        <Dropdown
          value={jumpPageValue}
          handleChange={handleJumpPageChange}
          data={limitDataValue}
        />
      </div>

      <div>
        <p className="invisible mb-2">dummy</p>
        <button
          className="rounded-sm text-white bg-[#0D28A6] py-4 px-8"
          onClick={handleSubmit}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default PaginationDropdown;
