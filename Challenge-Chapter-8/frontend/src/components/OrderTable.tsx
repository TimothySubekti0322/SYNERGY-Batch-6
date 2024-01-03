import React from "react";

type OrderData = {
  id: number;
  user_email: string;
  car: string;
  start_rent: string;
  finish_rent: string;
  price: number;
  status: string;
};

interface OrderTableProps {
  data: OrderData[];
}

const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-[#CFD4ED] font-bold">
          <td className="p-4">No</td>
          <td className="p-4">User Email</td>
          <td className="p-4">Car</td>
          <td className="p-4">Star Rent</td>
          <td className="p-4">Finish Rent</td>
          <td className="p-4">Price</td>
          <td className="p-4">Status</td>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order.id}>
            <td className="p-4">{order.id}</td>
            <td className="p-4">{order.user_email}</td>
            <td className="p-4">{order.car}</td>
            <td className="p-4">{order.start_rent}</td>
            <td className="p-4">{order.finish_rent}</td>
            <td className="p-4">{order.price}</td>
            <td className="p-4">{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;

export type { OrderData };
