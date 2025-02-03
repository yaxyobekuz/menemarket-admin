import { Link } from "react-router-dom";

// Stickers
import Lottie from "lottie-react";
import shruggingSticker from "../assets/stickers/shrugging.json";

const Page404 = () => {
  return (
    <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
      <div className={`flex flex-col items-center gap-5 max-w-max`}>
        {/* Sticker */}
        <Lottie
          animationData={shruggingSticker}
          className="size-28 xs:size-32 sm:size-36 md:size-40"
        />

        {/* Title */}
        <h1 className="text-nowrap text-lg font-medium text-center xs:text-xl sm:font-semibold sm:text-2xl">
          Sahifa topilmadi!
        </h1>

        {/* Link to Homepage */}
        <Link to="/" className="btn-primary px-5 py-2">
          Asosiy sahifa
        </Link>
      </div>
    </div>
  );
};

export default Page404;
