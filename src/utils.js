import avatars from "./data/avatars";

export const getRandomNumber = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPercentageBgColor = (percentage = 0) => {
  if (percentage >= 50) {
    return "bg-green-500";
  } else if (percentage >= 25) {
    return "bg-yellow-500";
  } else if (percentage > 0) {
    return "bg-red-500";
  } else {
    return "bg-black";
  }
};

// Format date
export const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

// Format time
export const formatTime = (input) => {
  const date = new Date(input);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

// Get random avatar
export const getRandomAvatar = (gender = "default") => {
  const data = avatars[gender?.toLowerCase()];
  const randomIndex = getRandomNumber(0, data.length - 1);
  return data[randomIndex];
};

// Get avatar by index
export const getAvatarByIndex = (gender = "default", index = 0) => {
  const data = avatars[gender?.toLowerCase()];
  return data[index] || data[0];
};
