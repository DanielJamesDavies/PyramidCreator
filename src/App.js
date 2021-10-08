// Packages

// Components
import { TopBar } from "./components/TopBar/TopBar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Pyramid } from "./components/Pyramid/Pyramid";
import { Notes } from "./components/Notes/Notes";

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
			<div className='content-container'>
				<Pyramid />
				<Notes />
			</div>
		</div>
	);
}

export default App;
