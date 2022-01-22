// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { ItemContext } from "../../context/ItemContext";
import { PyramidContext } from "../../context/PyramidContext";

// Styles

// Assets

export const ItemLogic = () => {
	const { selectedItem, setSelectedItem, changeSelectedItem, previousSelectedItem } = useContext(ItemContext);
	const { setPyramid, isEditing } = useContext(PyramidContext);

	function closeSelectedItem() {
		changeSelectedItem(false, 0, 0);
	}

	function changeTitle(e, noteIndex) {
		setSelectedItem((oldSelectedItem) => {
			var newSelectedItem = JSON.parse(JSON.stringify(oldSelectedItem));
			newSelectedItem.notes[noteIndex].title = e.target.value;
			return newSelectedItem;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[selectedItem.tier][selectedItem.index].notes[noteIndex].title = e.target.value;
			return newPyramid;
		});
	}

	function changeText(e, noteIndex) {
		setSelectedItem((oldSelectedItem) => {
			var newSelectedItem = JSON.parse(JSON.stringify(oldSelectedItem));
			newSelectedItem.notes[noteIndex].text = e.target.value.split("\n");
			return newSelectedItem;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[selectedItem.tier][selectedItem.index].notes[noteIndex].text = e.target.value.split("\n");
			return newPyramid;
		});
	}

	function removeNote(index) {
		setSelectedItem((oldSelectedItem) => {
			var newSelectedItem = JSON.parse(JSON.stringify(oldSelectedItem));
			newSelectedItem.notes.splice(index, 1);
			return newSelectedItem;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[selectedItem.tier][selectedItem.index].notes.splice(index, 1);
			return newPyramid;
		});
	}

	function onDropNote(res) {
		setSelectedItem((oldSelectedItem) => {
			var newSelectedItem = JSON.parse(JSON.stringify(oldSelectedItem));
			var tempItem = newSelectedItem.notes.splice(res.source, 1)[0];
			newSelectedItem.notes.splice(res.destination, 0, tempItem);
			return newSelectedItem;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			var tempItem = newPyramid.tiers[selectedItem.tier][selectedItem.index].notes.splice(res.source, 1)[0];
			newPyramid.tiers[selectedItem.tier][selectedItem.index].notes.splice(res.destination, 0, tempItem);
			return newPyramid;
		});
	}

	function addNote() {
		setSelectedItem((oldSelectedItem) => {
			var newSelectedItem = JSON.parse(JSON.stringify(oldSelectedItem));
			newSelectedItem.notes.push({ title: "", text: [""] });
			return newSelectedItem;
		});
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[selectedItem.tier][selectedItem.index].notes.push({ title: "", text: [""] });
			return newPyramid;
		});
	}

	return { selectedItem, previousSelectedItem, isEditing, closeSelectedItem, changeTitle, changeText, removeNote, onDropNote, addNote };
};
