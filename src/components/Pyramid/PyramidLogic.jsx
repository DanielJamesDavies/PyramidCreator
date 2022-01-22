// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { PyramidContext } from "../../context/PyramidContext";
import { ItemContext } from "../../context/ItemContext";

// Styles

// Assets

export const PyramidLogic = () => {
	const { pyramid, setPyramid, isEditing } = useContext(PyramidContext);
	const { selectedItem, changeSelectedItem } = useContext(ItemContext);
	const [tierSelected, setTierSelected] = useState(-1);
	const [tierOver, setTierOver] = useState(0);

	function changeName(e) {
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.name = e.target.value;
			return newPyramid;
		});
	}

	function onTierClick(tier) {
		if (tierSelected !== tier) {
			setTierSelected(tier);
			setTimeout(() => {
				setTierSelected((oldTierSelected) => {
					if (oldTierSelected === tier) return -1;
					return oldTierSelected;
				});
			}, 500);
		} else {
			setPyramid((oldPyramid) => {
				var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
				newPyramid.tiers.splice(tier, 1);
				return newPyramid;
			});
		}
	}

	function changeValue(e, tier, index) {
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[tier][index].value = e.target.value;
			return newPyramid;
		});
	}

	function selectItem(e, tier, index) {
		e.stopPropagation();
		if (tier === undefined || index === undefined) return changeSelectedItem(false, 0, 0);
		changeSelectedItem(pyramid.tiers[tier][index], tier, index);
	}

	function removeItem(e, tier, index) {
		e.stopPropagation();
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[tier].splice(index, 1);
			return newPyramid;
		});
	}

	function onDropPyramidValueItem(res, tier) {
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			var tempItem = newPyramid.tiers[tier].splice(res.source, 1)[0];
			console.log(res.destination, newPyramid.tiers[tierOver].length);
			if (tier !== tierOver) res.destination = newPyramid.tiers[tierOver].length;
			newPyramid.tiers[tierOver].splice(res.destination, 0, tempItem);
			return newPyramid;
		});
	}

	function addValue(e, tier) {
		e.stopPropagation();
		setPyramid((oldPyramid) => {
			if (oldPyramid.tiers[tier].length >= 9) return oldPyramid;
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[tier].push({ value: "", notes: [] });
			return newPyramid;
		});
	}

	function addTier(e) {
		e.stopPropagation();
		setPyramid((oldPyramid) => {
			if (oldPyramid.tiers.length >= 7) return oldPyramid;
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers.push([]);
			return newPyramid;
		});
	}

	return {
		pyramid,
		isEditing,
		selectedItem,
		tierSelected,
		setTierOver,
		changeName,
		onTierClick,
		changeValue,
		selectItem,
		removeItem,
		onDropPyramidValueItem,
		addValue,
		addTier,
	};
};
