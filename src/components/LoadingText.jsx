// Components
import DotsLoader from "./DotsLoader";

const LoadingText = ({ loader = false, text = "" }) =>
  loader ? <DotsLoader /> : text;

export default LoadingText;
