import React from "react";
import "./App.less";
import GlobalProvider from "./providers";
import Routes from "./routes";

function App() {
	return (
		<GlobalProvider>
			<Routes />
		</GlobalProvider>
	);
}

export default App;
