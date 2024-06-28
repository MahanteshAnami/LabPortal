import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { store } from './Store/store';

if (!localStorage.getItem("username")) {
  localStorage.setItem("username", "HarleyLabs");
}
if (!localStorage.getItem("password")) {
  localStorage.setItem("password", "lab123");
}

if (!localStorage.getItem("accessToken")) {
  localStorage.setItem("accessToken", "abc");
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);

reportWebVitals();
