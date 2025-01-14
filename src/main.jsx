import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Components/Routes/Routes.jsx";
import { ConfigProvider } from "antd";
import React from "react";
import { mainTheme } from "./theme/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={mainTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
