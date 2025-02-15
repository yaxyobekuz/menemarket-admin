import { useEffect, useState } from "react";

// Components
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import DonateItem from "@/components/DonateItem";
import DotsLoader from "@/components/DotsLoader";

// Services
import donateService from "@/api/services/donateService";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateDonates } from "@/store/features/donatesSlice";

const DonationBox = () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allDonates = useSelector((state) => state.donates.data);
  const [filteredDonates, setFilteredDonates] = useState(allDonates || []);

  // Get donates
  const loadDonates = () => {
    setHasError(false);
    setIsLoading(true);

    donateService
      .getDonates()
      .then((data) => {
        setFilteredDonates(data);
        dispatch(updateDonates(data));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (allDonates?.length === 0) loadDonates();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>Hayriya qutisi</h1>

      {/* Nav tabs */}
      <Tabs name="donate" />

      {/* Donates */}
      {!isLoading && !hasError && filteredDonates?.length >= 0 && (
        <ul className="grid grid-cols-1 gap-3.5 xs:gap-4 sm:gap-5 lg:grid-cols-2">
          {filteredDonates.map((donate) => (
            <DonateItem data={donate} key={donate?._id} />
          ))}
        </ul>
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
            onClick={loadDonates}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationBox;
