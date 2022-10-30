import "./assets/styles/style.scss";

import React from "react";
import { createRoot } from "react-dom/client";
import {store} from "./assets/stores/store"
import { App } from "./assets/components/App";
import { Provider } from "react-redux";

const container = document.getElementById("app");
const root = createRoot(container);


root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
