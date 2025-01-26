import { createRoot } from "react-dom/client";

// CSS (styles)
import "./css/fonts.css";
import "./css/index.css";

// Components
import App from "./App.jsx";

// Redux
import store from "./store/store.js";
import { Provider } from "react-redux";

// Render the project
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
