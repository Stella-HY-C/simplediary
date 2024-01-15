import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictMode로 되어있으면 console도 두번찍힘 -> 리랜더링되는것같음
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
