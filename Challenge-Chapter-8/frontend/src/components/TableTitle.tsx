import React from "react";

type TableTitleProps = {
  title: string;
};

const TableTitle: React.FC<TableTitleProps> = ({ title }) => {
  return (
    <div className="border-l-4 pl-2 border-[#0D28A6] font-bold">{title}</div>
  );
};

export default TableTitle;
