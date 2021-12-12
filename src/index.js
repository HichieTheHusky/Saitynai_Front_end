import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./react-redux/reducer";

const initialStore = {
  apiUrl: "http://http://127.0.0.1:5000/Testy/api/projects",
  access_token: localStorage.getItem("access_token"),
  loggedIn: false,
};

const store = createStore(reducer, initialStore);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
