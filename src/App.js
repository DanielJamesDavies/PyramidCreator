// Packages

// Components
import { TopBar } from "./components/TopBar/TopBar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Pyramid } from "./components/Pyramid/Pyramid";

// Logic

// Context

// Styles
import "./App.css";

// Assets

function App() {
	return (
		<div className='App'>
			<TopBar />
			<Sidebar />
			<Pyramid />
		</div>
	);
}

export default App;
