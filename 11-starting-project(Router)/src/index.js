import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // BrowserRouter 컴포넌트로 래핑을 하면, 리액트 라우터가 활성화 되고, 경로 정의와 같은 리액트 라우터 가능이 잠금해제된다.
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
