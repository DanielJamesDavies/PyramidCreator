// Packages
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// Components
import App from "./App";

// Logic

// Context
import PyramidProvider from "./context/PyramidContext";
import ItemProvider from "./context/ItemContext";

// Styles

// Assets

ReactDOM.render(
	<PyramidProvider>
		<ItemProvider>
			<App />
		</ItemProvider>
	</PyramidProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
