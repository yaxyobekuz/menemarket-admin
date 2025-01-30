import React from "react";
import { Link, useLocation } from "react-router-dom";

const Page404 = () => {
  const { pathname } = useLocation();

  return (
    <div className="container py-6 space-y-7">
      {/* Title */}
      <h1>404 Sahifa topilmadi!</h1>

      {/* Description */}
      <div className="text-lg text-neutral-500 sm:text-xl">
        <span>Kechirasiz, </span>
        <b className="font-medium">{pathname}</b>
        <span> yo'l nomli sahifa mavjud emas.</span>
      </div>

      <Link to="/" className="btn-primary max-w-max px-12 py-2.5">
        Bosh sahifa
      </Link>
    </div>
  );
};

export default Page404;
