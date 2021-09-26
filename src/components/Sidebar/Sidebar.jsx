// Packages
import { FaFileImport, FaEdit, FaMountain, FaFileExport } from "react-icons/fa";

// Components

// Logic
import { SidebarLogic } from "./SidebarLogic";

// Context

// Styles
import "./Sidebar.css";

// Assets

export const Sidebar = () => {
	const { changePyramidInputRef, downloadPyramidBtnRef, changePyramid, isEditing, toggleIsEditing, savePyramid } = SidebarLogic();

	return (
		<div className='sidebar-container'>
			<input className='sidebar-change-pyramid-input' ref={changePyramidInputRef} type='file' onChange={changePyramid} />
			<div className='sidebar-btn-container'>
				<button className='sidebar-btn sidebar-btn-import' onClick={() => changePyramidInputRef.current.click()}>
					<FaFileImport />
				</button>
				<div className='sidebar-btn-label'>Import</div>
			</div>

			<div className='sidebar-btn-container'>
				<button className={!isEditing ? "sidebar-btn sidebar-btn-edit" : "sidebar-btn sidebar-btn-view"} onClick={toggleIsEditing}>
					{!isEditing ? <FaEdit /> : <FaMountain />}
				</button>
				<div className='sidebar-btn-label'>{!isEditing ? "Edit" : "View"}</div>
			</div>

			<div className='sidebar-btn-container'>
				<a ref={downloadPyramidBtnRef} style={{ display: "none" }} href='/'>
					Download
				</a>
				<button className='sidebar-btn sidebar-btn-export' onClick={savePyramid}>
					<FaFileExport />
				</button>
				<div className='sidebar-btn-label'>Export</div>
			</div>
		</div>
	);
};
