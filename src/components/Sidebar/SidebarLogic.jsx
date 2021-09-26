// Packages
import { useRef, useContext } from "react";

// Components

// Logic

// Context
import { PyramidContext } from "../../context/PyramidContext";

// Styles

// Assets

export const SidebarLogic = () => {
	const changePyramidInputRef = useRef();
	const downloadPyramidBtnRef = useRef();
	const { pyramid, setPyramid, isEditing, setIsEditing } = useContext(PyramidContext);

	function changePyramid(e) {
		if (e.target.files.length === 0) return false;
		const fr = new FileReader();
		fr.readAsText(e.target.files[0]);
		fr.onload = () => {
			setPyramid(JSON.parse(fr.result));
			changePyramidInputRef.current.value = [];
		};
		fr.onerror = (error) => {
			console.log(error);
		};
	}

	function toggleIsEditing() {
		setIsEditing((oldIsEditing) => {
			return !oldIsEditing;
		});
	}

	function savePyramid() {
		downloadPyramidBtnRef.current.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pyramid)));
		downloadPyramidBtnRef.current.setAttribute("download", pyramid.name + ".json");
		downloadPyramidBtnRef.current.click();
	}

	return { changePyramidInputRef, downloadPyramidBtnRef, changePyramid, isEditing, toggleIsEditing, savePyramid };
};
