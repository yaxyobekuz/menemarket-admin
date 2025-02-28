// Components
import Icon from "./Icon";

// Data
import avatars from "@/data/avatars";

const DonateItem = ({ data }) => {
  const {
    fund: amount,
    anonim: anonym,
    user_id: { avatar, name, username },
  } = data || {};
  const validAvatar = anonym ? false : avatar?.small.startsWith("https");

  return (
    <li className="flex items-center gap-3.5 w-full bg-neutral-50/70 p-3.5 rounded-xl border transition-colors duration-200 hover:bg-neutral-50 xs:p-4 xs:gap-4 sm:p-5 sm:gap-5">
      {/* User avatar */}
      <Icon
        size={48}
        alt="User avatar"
        src={validAvatar ? avatar?.small : avatars["default"][2]}
        className="size-10 shrink-0 bg-gray-light object-cover rounded-full xs:size-11 sm:size-12"
      />

      {/* details */}
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1.5">
          <h3
            aria-label="Author name"
            className="font-medium line-clamp-1 text-base sm:text-lg"
          >
            {anonym ? "Anonim foydalanuvchi" : name}
          </h3>

          <p className="text-neutral-500">
            @{anonym ? "foydalanuvchi_nomi" : username}
          </p>
        </div>

        <span className="flex items-center gap-4 text-lg text-green-600">
          +{amount?.toLocaleString() || 0} so'm
        </span>
      </div>
    </li>
  );
};

export default DonateItem;
