import axios from "axios";
import avatars from "./data/avatars";
import addresses from "./data/addresses";

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
  if (!input) return null;

  const date = new Date(input);

  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

// Format time
export const formatTime = (input) => {
  if (!input) return null;

  const date = new Date(input);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const isOneDayPassed = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  inputDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  const differenceInTime = currentDate - inputDate;
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  return differenceInDays >= 1;
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

export const extractNumbers = (text = "") => {
  return text.replace(/\D/g, "");
};

export const extractIdFromUrl = (url) => {
  const id = url.split("https://nyc3.digitaloceanspaces.com/menemarket/");
  return id?.length === 2 ? id[1] : null;
};

export const sendMessageToTelegram = async (chatId, text) => {
  const payload = { text, chat_id: chatId };
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  return await axios.post(url, payload); // Send message to telegram chat
};

export const formatUzbekPhoneNumber = (input) => {
  const digits = input.replace(/\D/g, "");
  const normalized = digits.startsWith("998") ? digits : "998" + digits;
  if (normalized.length !== 12) return "Noto'g'ri raqam";
  const code = normalized.slice(3, 5);
  const part1 = normalized.slice(5, 8);
  const part2 = normalized.slice(8, 10);
  const part3 = normalized.slice(10, 12);

  return `+998 (${code}) ${part1} ${part2} ${part3}`;
};
