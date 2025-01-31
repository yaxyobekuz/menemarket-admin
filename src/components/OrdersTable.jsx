import React, { useState } from "react";

// Components
import OrderItem from "./OrderItem";

const OrdersTable = ({ orders }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (e) => setIsScrolled(e.target.scrollLeft > 1);

  return (
    <div
      onScroll={handleScroll}
      className="w-full max-w-full overflow-x-auto scroll-x-primary"
    >
      <table className="min-w-[1620px] max-w-full w-full table-fixed">
        {/* Head */}
        <thead className="bg-white">
          <tr className="h-12">
            <th
              className={`${
                isScrolled ? "custom-active-border-r" : null
              } sticky left-0 inset-y-0 w-14 bg-white font-semibold transition-colors duration-200`}
            >
              No
            </th>
            <th className="font-semibold">Foydalanuvchi</th>
            <th className="font-semibold">Manzil</th>
            <th className="font-semibold">Tel raqam</th>
            <th className="font-semibold">Holati</th>
            <th className="font-semibold">Mahsulot ID</th>
            <th className="font-semibold">Mahsulot narxi</th>
            <th className="font-semibold">Sana</th>
            <th className="w-28 font-semibold">Darajasi</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {orders.map((order, index) => (
            <OrderItem
              data={order}
              index={index + 1}
              key={order?._id}
              isScrolled={isScrolled}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
