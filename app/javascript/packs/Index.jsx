import React from "react";
import { render } from "react-dom";

import App from "../components/App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});