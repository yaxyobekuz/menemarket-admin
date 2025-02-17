import React, { useEffect, useState } from "react";

// Components
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import DotsLoader from "@/components/DotsLoader";
import PaymentsTable from "@/components/PaymentsTable";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

// Services
import paymentsService from "@/api/services/paymentsService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updatePayments } from "@/store/features/paymentsSlice";

const Payments = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allPayments = useSelector((state) => state.payments.data);
  const [filteredPayments, setFilteredPayments] = useState(allPayments || []);

  const loadPayments = () => {
    setHasError(false);
    setIsLoading(true);

    paymentsService
      .getPayments()
      .then((payments) => {
        setFilteredPayments(payments);
        dispatch(updatePayments(payments));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (allPayments?.length === 0) loadPayments();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>To'lovlar</h1>

      {/* Nav tabs */}
      <Tabs name="payments" />

      {/* Payments */}
      {!isLoading && !hasError && filteredPayments?.length >= 0 && (
        <div className="overflow-hidden rounded-xl">
          <PaymentsTable data={filteredPayments} />
        </div>
      )}

      {/* Loading animation */}
      {isLoading && !hasError && (
        <DotsLoader
          color="#0085FF"
          className="flex justify-center fixed top-1/2 inset-x-0 w-full"
        />
      )}

      {/* Reload button */}
      {hasError && !isLoading && (
        <div className="flex justify-center fixed top-[calc(50%-20px)] inset-x-0">
          <button
            title="Reload"
            aria-label="Reload"
            onClick={loadPayments}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Payments;
