import React from "react";

type CarData = {
  id: number;
  name: string;
  cost: number;
  size: string;
  available: boolean;
  published: boolean;
  start_rent: string;
  finish_rent: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  delete_by: string | null;
};

interface CarTableProps {
  data: CarData[];
}

const CarTable: React.FC<CarTableProps> = ({ data }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-[#CFD4ED] font-bold">
          <td className="p-4">No</td>
          <td className="p-4">Name</td>
          <td className="p-4">Price</td>
          <td className="p-4">Star Rent</td>
          <td className="p-4">Finish Rent</td>
          <td className="p-4">Created at</td>
          <td className="p-4">Updated at</td>
        </tr>
      </thead>
      <tbody>
        {data.map((car) => (
          <tr key={car.id}>
            <td className="p-4">{car.id}</td>
            <td className="p-4">{car.name}</td>
            <td className="p-4">{car.cost}</td>
            <td className="p-4">{car.start_rent}</td>
            <td className="p-4">{car.finish_rent}</td>
            <td className="p-4">{car.created_at}</td>
            <td className="p-4">{car.updated_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;

export type { CarData };
