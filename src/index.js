import "./assets/styles/style.scss";

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./assets/components/App";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(<App />);
