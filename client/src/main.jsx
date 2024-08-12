import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Store from "./store/Store.js";
import { Provider } from "react-redux";

import persistStore from "redux-persist/es/persistStore";
// import persistStore from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(Store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
