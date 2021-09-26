// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { PyramidContext } from "../../context/PyramidContext";

// Styles

// Assets

export const PyramidLogic = () => {
	const { pyramid, setPyramid, isEditing } = useContext(PyramidContext);
	const [tierSelected, setTierSelected] = useState(-1);

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
			newPyramid.tiers[tier][index] = e.target.value;
			return newPyramid;
		});
	}

	function removeValue(e, tier, index) {
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
			newPyramid.tiers[tier].splice(res.destination, 0, tempItem);
			return newPyramid;
		});
	}

	function addValue(e, tier) {
		e.stopPropagation();
		setPyramid((oldPyramid) => {
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers[tier].push("");
			return newPyramid;
		});
	}

	function addTier(e) {
		e.stopPropagation();
		setPyramid((oldPyramid) => {
			if (oldPyramid.tiers.length >= 5) return oldPyramid;
			var newPyramid = JSON.parse(JSON.stringify(oldPyramid));
			newPyramid.tiers.push([]);
			return newPyramid;
		});
	}

	return {
		pyramid,
		isEditing,
		tierSelected,
		changeName,
		onTierClick,
		changeValue,
		removeValue,
		onDropPyramidValueItem,
		addValue,
		addTier,
	};
};
