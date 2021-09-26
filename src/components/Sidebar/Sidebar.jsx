// Packages
import { FaEdit, FaMountain, FaFolderOpen, FaSave } from "react-icons/fa";

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
				<button className='sidebar-btn sidebar-btn-open' onClick={() => changePyramidInputRef.current.click()}>
					<FaFolderOpen />
				</button>
				<div className='sidebar-btn-label'>Open</div>
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
				<button className='sidebar-btn sidebar-btn-save' onClick={savePyramid}>
					<FaSave />
				</button>
				<div className='sidebar-btn-label'>Save</div>
			</div>
		</div>
	);
};
