// Packages
import { useRef, useContext } from "react";

// Components

// Logic

// Context
import { PyramidContext } from "../../context/PyramidContext";
import { ElementContext } from "../../context/ElementContext";

// Styles

// Assets

export const SidebarLogic = () => {
	const { pyramid, setPyramid, isEditing, setIsEditing } = useContext(PyramidContext);
	const { changeSelectedElement } = useContext(ElementContext);
	const changePyramidInputRef = useRef();
	const downloadPyramidBtnRef = useRef();

	const openPyramidBtn = useRef();
	const editViewPyramidBtn = useRef();
	const savePyramidBtn = useRef();

	function changePyramid(e) {
		if (e.target.files.length === 0) return false;
		const fr = new FileReader();
		fr.readAsText(e.target.files[0]);
		fr.onload = () => {
			var pyramidFile = JSON.parse(fr.result);
			var newPyramid = { name: "", tiers: [] };
			if (pyramidFile.name !== undefined) newPyramid.name = pyramidFile.name;
			if (pyramidFile.tiers !== undefined) newPyramid.tiers = pyramidFile.tiers;
			setPyramid(newPyramid);
			changeSelectedElement(false);
			changePyramidInputRef.current.value = [];
		};
		fr.onerror = (error) => {
			console.log(error);
		};
	}

	function openPyramid() {
		changePyramidInputRef.current.click();
		openPyramidBtn.current.blur();
	}

	function toggleIsEditing() {
		setIsEditing((oldIsEditing) => {
			return !oldIsEditing;
		});
		editViewPyramidBtn.current.blur();
	}

	function savePyramid() {
		downloadPyramidBtnRef.current.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pyramid)));
		if (pyramid.name !== "") {
			downloadPyramidBtnRef.current.setAttribute("download", pyramid.name + ".json");
		} else {
			downloadPyramidBtnRef.current.setAttribute("download", "pyramid.json");
		}
		downloadPyramidBtnRef.current.click();
		savePyramidBtn.current.blur();
	}

	return {
		changePyramidInputRef,
		downloadPyramidBtnRef,
		openPyramidBtn,
		editViewPyramidBtn,
		savePyramidBtn,
		changePyramid,
		isEditing,
		openPyramid,
		toggleIsEditing,
		savePyramid,
	};
};
