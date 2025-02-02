import React, { useState } from "react";

// Components
import UserItem from "./UserItem";

const UsersTable = ({ users, deleteUser }) => {
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
              } sticky left-0 inset-y-0 w-14 bg-white transition-colors duration-200`}
            >
              No
            </th>
            <th>ID</th>
            <th>Ismi</th>
            <th className="w-32">Roli</th>
            <th>Holati</th>
            <th>E-pochta</th>
            <th>Balans</th>
            <th className="w-32">Sana</th>
            <th className="w-20">Harakat</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {users.map((order, index) => (
            <UserItem
              data={order}
              key={order?._id}
              index={index + 1}
              deleteUser={deleteUser}
              isScrolled={isScrolled}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
