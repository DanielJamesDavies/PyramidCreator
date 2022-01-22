import React, { createContext, useState } from "react";

export const ItemContext = createContext();

// eslint-disable-next-line
export default ({ children }) => {
	const [selectedItem, setSelectedItem] = useState(false);
	const [previousSelectedItem, setPreviousSelectedItem] = useState(false);

	function changeSelectedItem(value, tier, index) {
		if (value === false) {
			setSelectedItem((oldSelectedItem) => {
				setPreviousSelectedItem(oldSelectedItem);
				return false;
			});
		} else {
			setPreviousSelectedItem(false);

			var newValue = JSON.parse(JSON.stringify(value));
			newValue.tier = tier;
			newValue.index = index;
			setSelectedItem(newValue);
		}
	}

	return (
		<ItemContext.Provider value={{ selectedItem, setSelectedItem, changeSelectedItem, previousSelectedItem }}>{children}</ItemContext.Provider>
	);
};
