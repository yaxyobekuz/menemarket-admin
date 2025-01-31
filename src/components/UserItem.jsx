import React from "react";
import { Link } from "react-router-dom";

// Data
import roles from "@/data/roles";

// Utils
import { formatDate } from "@/utils";

// Components
import StickyCell from "./StickyCell";
import TruncatedCell from "./TruncatedCell";

const UserItem = ({ data = {}, index = 0, isScrolled }) => {
  const {
    email,
    balance,
    _id: id,
    status: role,
    name: firstName,
    created_at: timestamp,
  } = data || {};

  const formattedRole =
    roles.find(({ value }) => value == role?.toLowerCase())?.name ||
    "Mavjud emas";

  return (
    <tr className="group h-12 bg-neutral-50 even:bg-white">
      {/* Index */}
      <StickyCell children={index} isActive={isScrolled} />

      {/* Id */}
      <td>{id}</td>

      {/* First Name */}
      <TruncatedCell trunc="line-clamp-2">
        <Link to={`/users/user/${id}`} className="primary-link">
          {firstName}
        </Link>
      </TruncatedCell>

      {/* Role */}
      <td>{formattedRole}</td>

      {/* Email */}
      <TruncatedCell>
        <a href={`mailto:${email}`} className="primary-link">
          {email}
        </a>
      </TruncatedCell>

      {/* Balance */}
      <TruncatedCell>{balance?.toLocaleString()} so'm</TruncatedCell>

      {/* Date */}
      <td>{formatDate(timestamp)}</td>
    </tr>
  );
};

export default UserItem;
