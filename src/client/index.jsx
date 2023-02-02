import React from "react";
import { hydrateRoot } from "react-dom/client";
import './styles.global.scss'
import App from "../shared/App";

hydrateRoot(
	document.getElementById('root'),
	<App />
);
