// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { ElementContext } from "../../context/ElementContext";
import { PyramidContext } from "../../context/PyramidContext";

// Styles

// Assets

export const NotesLogic = () => {
	const { selectedElement, setSelectedElement, changeSelectedElement, previousSelectedElement } = useContext(ElementContext);
	const { setPyramid, isEditing } = useContext(PyramidContext);

	function closeSelectedElement() {
		changeSelectedElement(false, 0, 0);
	}

	function changeTitle(e, noteIndex) {
		setSelectedElement((oldSelectedElement) => {
			var newSelectedElement = JSON.parse(JSON.stringify(oldSelectedElement));
			newSelectedElement.notes[noteIndex].title = e.target.value;
			return newSelectedElement;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[selectedElement.tier][selectedElement.index].notes[noteIndex].title = e.target.value;
			return newPyramid;
		});
	}

	function changeText(e, noteIndex) {
		setSelectedElement((oldSelectedElement) => {
			var newSelectedElement = JSON.parse(JSON.stringify(oldSelectedElement));
			newSelectedElement.notes[noteIndex].text = e.target.value.split("\n");
			return newSelectedElement;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[selectedElement.tier][selectedElement.index].notes[noteIndex].text = e.target.value.split("\n");
			return newPyramid;
		});
	}

	function removeNote(index) {
		setSelectedElement((oldSelectedElement) => {
			var newSelectedElement = JSON.parse(JSON.stringify(oldSelectedElement));
			newSelectedElement.notes.splice(index, 1);
			return newSelectedElement;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[selectedElement.tier][selectedElement.index].notes.splice(index, 1);
			return newPyramid;
		});
	}

	function onDropNote(res) {
		setSelectedElement((oldSelectedElement) => {
			var newSelectedElement = JSON.parse(JSON.stringify(oldSelectedElement));
			var tempItem = newSelectedElement.notes.splice(res.source, 1)[0];
			newSelectedElement.notes.splice(res.destination, 0, tempItem);
			return newSelectedElement;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			var tempItem = newPyramid.tiers[selectedElement.tier][selectedElement.index].notes.splice(res.source, 1)[0];
			newPyramid.tiers[selectedElement.tier][selectedElement.index].notes.splice(res.destination, 0, tempItem);
			return newPyramid;
		});
	}

	function addNote() {
		setSelectedElement((oldSelectedElement) => {
			var newSelectedElement = JSON.parse(JSON.stringify(oldSelectedElement));
			newSelectedElement.notes.push({ title: "", text: [""] });
			return newSelectedElement;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[selectedElement.tier][selectedElement.index].notes.push({ title: "", text: [""] });
			return newPyramid;
		});
	}

	return { selectedElement, previousSelectedElement, isEditing, closeSelectedElement, changeTitle, changeText, removeNote, onDropNote, addNote };
};
