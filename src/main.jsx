import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:2200';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
