import React from "react";
import { Link } from "react-router-dom";

// Data
import roles from "@/data/roles";

// Components
import Icon from "./Icon";
import StickyCell from "./StickyCell";
import TruncatedCell from "./TruncatedCell";

// Utils
import { formatDate, isOneDayPassed } from "@/utils";

// Images
import deleteIcon from "../assets/images/icons/delete.svg";

const UserItem = ({ data = {}, index = 0, isScrolled, deleteUser }) => {
  const {
    email,
    balance,
    _id: id,
    status: role,
    name: firstName,
    created_at: timestamp,
    verificated: isVerificated,
  } = data || {};

  const canDelete = isOneDayPassed(timestamp) && !isVerificated;
  const handleDeleteUser = () => (canDelete ? deleteUser(id) : null);
  const formattedRole =
    roles.find(({ value }) => value == role?.toLowerCase())?.name ||
    role ||
    "Mavjud emas";

  return (
    <tr className="group h-12 bg-neutral-50 even:bg-white">
      {/* Index */}
      <StickyCell children={index} isActive={isScrolled} />

      {/* Id */}
      <TruncatedCell>{id}</TruncatedCell>

      {/* First Name */}
      <TruncatedCell trunc="2">
        <Link to={`/users/search/${id}`} className="primary-link">
          {firstName}
        </Link>
      </TruncatedCell>

      {/* Role */}
      <td>{formattedRole}</td>

      {/* Verificated */}
      <td>
        <span className={isVerificated ? "text-green-500" : "text-red-500"}>
          {isVerificated ? "Tasdiqlangan" : "Tasdiqlanmagan"}
        </span>
      </td>

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

      {/* Delete button */}
      <td>
        <button
          disabled={!canDelete}
          onClick={handleDeleteUser}
          className="p-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Icon src={deleteIcon} />
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
