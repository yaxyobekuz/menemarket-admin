import React, { useState } from "react";

// Components
import PaymentItem from "./PaymentItem";

const PaymentsTable = ({ data }) => {
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
            <th className="font-semibold">Rol</th>
            <th className="font-semibold">E-pochta</th>
            <th className="font-semibold">Holat</th>
            <th className="font-semibold">Karta raqam</th>
            <th className="font-semibold">Karta ega</th>
            <th className="font-semibold">Qiymat</th>
            <th className="font-semibold">Sana</th>
            <th className="w-28 font-semibold">Harakat</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>

          {data?.map((order, index) => (
            <PaymentItem
              data={order}
              key={order?._id}
              index={index + 1}
              isScrolled={isScrolled}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
