import React from "react";
import { Link } from "react-router-dom";

// Data
import addresses from "@/data/addresses";

// Utils
import { extractNumbers, formatDate, getPercentageBgColor } from "@/utils";

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
    addresses.find(({ value }) => value == address)?.name || "Mavjud emas";

  return (
    <tr key={index} className="group h-12 bg-neutral-50 even:bg-white">
      {/* Index */}
      <td
        className={`${
          isScrolled ? "custom-active-border-r" : null
        } sticky left-0 inset-y-0 bg-neutral-50 text-center transition-colors duration-200 group-even:bg-white`}
      >
        {index}
      </td>

      {/* User */}
      <td className="text-center">
        <span className="line-clamp-2">{firstName}</span>
      </td>

      {/* Address */}
      <td className="text-center">
        <address className="not-italic">{formattedAddress}</address>
      </td>

      {/* Phone */}
      <td className="text-center">
        <a
          href={`tel:+${extractNumbers(tel)}`}
          className="transition-colors duration-200 hover:text-primary-default"
        >
          {tel}
        </a>
      </td>

      {/* Status */}
      <td className="text-center">{status}</td>

      {/* Product */}
      <td className="text-center">
        <Link
          to={`/products/product/${productId}`}
          className="transition-colors duration-200 hover:text-primary-default"
        >
          {productId}
        </Link>
      </td>

      {/* Price */}
      <td className="text-center">{price?.toLocaleString()} so'm</td>

      {/* Date */}
      <td className="text-center">{formatDate(timestamp)}</td>

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
