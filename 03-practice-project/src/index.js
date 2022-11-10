import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductAmountContextProvider } from "./components/store/product-amount-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductAmountContextProvider>
    <App />
  </ProductAmountContextProvider>
);
