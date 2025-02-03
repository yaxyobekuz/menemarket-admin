import Lottie from "lottie-react";

// Stickers
import gearSticker from "../assets/stickers/gear.json";

const Repair = ({ title = "Sahifa ta'mirlanmoqda...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center gap-5 max-w-max ${className}`}>
      {/* Sticker */}
      <Lottie
        animationData={gearSticker}
        className="size-28 xs:size-32 sm:size-36 md:size-40"
      />

      {/* Title */}
      <span className="text-nowrap text-lg font-medium text-center xs:text-xl sm:font-semibold sm:text-2xl">
        {title}
      </span>
    </div>
  );
};

export default Repair;
