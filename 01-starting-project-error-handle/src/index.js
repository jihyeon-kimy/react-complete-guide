import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));

const root = createRoot(document.getElementById("root"));

root.render(<App />);
