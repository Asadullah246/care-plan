import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./states/app.context";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <AppContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </AppContextProvider>
  </Provider>,
  document.getElementById("root")
);
