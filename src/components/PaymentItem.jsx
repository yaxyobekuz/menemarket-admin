import React from "react";
import { Link } from "react-router-dom";

// Data
import roles from "@/data/roles";
import orderStatuses from "@/data/orderStatuses";

// Components
import Icon from "./Icon";
import StickyCell from "./StickyCell";
import CopyButton from "./CopyButton";
import TruncatedCell from "./TruncatedCell";

// Utils
import { extractNumbers, formatDate } from "@/utils";

// Images
import reloadIcon from "../assets/images/icons/double-reload.svg";

const PaymentItem = ({ data = {}, index = 0, isScrolled }) => {
  const {
    status,
    sending: user,
    payment: amount,
    created_at: timestamp,
    card_owner: cardOwner,
    card_number: cardNumber,
  } = data || {};

  const { name: firstName, status: role, _id: userId, email } = user || {};

  const formattedRole =
    roles.find(({ value }) => value == role?.toLowerCase())?.name ||
    role ||
    "Mavjud emas";

  const formattedStatus =
    orderStatuses.find(({ value }) => value == status)?.label || status;

  const statusColor =
    orderStatuses.find(({ value }) => value == status)?.color || "black";

  return (
    <tr className="group h-12 bg-neutral-50 even:bg-white">
      {/* Index */}
      <StickyCell children={index} isActive={isScrolled} />

      {/* User */}
      <TruncatedCell trunc="2">
        <Link to={`/users/user/${userId}`} className="primary-link">
          {firstName || "Mavjud emas"}
        </Link>
      </TruncatedCell>

      {/* Role */}
      <td>{formattedRole}</td>

      {/* Email */}
      <td>
        <a href={`mailto:${email}`} className="primary-link">
          {email}
        </a>
      </td>

      {/* Status */}
      <td style={{ color: statusColor }}>{formattedStatus}</td>

      {/* Card number */}
      <td>
        <CopyButton
          className="disabled:opacity-50"
          text={extractNumbers(cardNumber)}
          notificationText="Karta raqamdan nusxa olindi"
        >
          {cardNumber}
        </CopyButton>
      </td>

      {/* Card owner */}
      <TruncatedCell trunc="2">{cardOwner}</TruncatedCell>

      {/* Amount */}
      <td>{amount?.toLocaleString() || "Mavjud emas"} so'm</td>

      {/* Date */}
      <td>{formatDate(timestamp)}</td>

      <td>
        <div className="flex justify-center w-full">
          <button aria-label="Reload" disabled className="btn size-11">
            <Icon
              size={20}
              src={reloadIcon}
              alt="Reload icon"
              className="size-5"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PaymentItem;
