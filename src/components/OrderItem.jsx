import React from "react";
import { Link } from "react-router-dom";

// Data
import addresses from "@/data/addresses";

// Components
import StickyCell from "./StickyCell";
import TruncatedCell from "./TruncatedCell";

// Utils
import { extractNumbers, formatDate, getPercentageBgColor } from "@/utils";
import orderStatuses from "@/data/orderStatuses";

const OrderItem = ({ data = {}, index = 0, isScrolled }) => {
  const {
    status,
    client_mobile: tel,
    total_price: price,
    created_at: timestamp,
    product_id: productId,
    client_name: firstName,
    client_address: address,
  } = data || {};

  const formattedAddress =
    addresses.find(({ value }) => value == address)?.label || address;

  const formattedStatus =
    orderStatuses.find(({ value }) => value == status)?.label || status;

  const statusColor =
    orderStatuses.find(({ value }) => value == status)?.color || "black";

  return (
    <tr className="group h-12 bg-neutral-50 even:bg-white">
      {/* Index */}
      <StickyCell children={index} isActive={isScrolled} />

      {/* User */}
      <TruncatedCell trunc="line-clamp-2">{firstName}</TruncatedCell>

      {/* Address */}
      <td>
        <address>{formattedAddress?.label}</address>
      </td>

      {/* Phone */}
      <td>
        <a href={`tel:+${extractNumbers(tel)}`} className="primary-link">
          {tel}
        </a>
      </td>

      {/* Status */}
      <td style={{ color: statusColor }}>{formattedStatus}</td>

      {/* Product ID */}
      <td>
        <Link to={`/products/product/${productId}`} className="primary-link">
          {productId}
        </Link>
      </td>

      {/* Price */}
      <td>{price?.toLocaleString()} so'm</td>

      {/* Date */}
      <td>{formatDate(timestamp)}</td>

      <td>
        <div
          className={`${getPercentageBgColor(
            10
          )} flex items-center justify-center w-11 h-6 m-auto rounded-full text-white text-sm`}
        >
          {10}%
        </div>
      </td>
    </tr>
  );
};

export default OrderItem;
