import React, { createContext, useState } from "react";

export const ElementContext = createContext();

// eslint-disable-next-line
export default ({ children }) => {
	const [selectedElement, setSelectedElement] = useState(false);
	const [previousSelectedElement, setPreviousSelectedElement] = useState(false);

	function changeSelectedElement(value, tier, index) {
		if (value === false) {
			setSelectedElement((oldSelectedElement) => {
				setPreviousSelectedElement(oldSelectedElement);
				return false;
			});
		} else {
			setPreviousSelectedElement(false);

			var newValue = JSON.parse(JSON.stringify(value));
			newValue.tier = tier;
			newValue.index = index;
			setSelectedElement(newValue);
		}
	}

	return (
		<ElementContext.Provider value={{ selectedElement, setSelectedElement, changeSelectedElement, previousSelectedElement }}>
			{children}
		</ElementContext.Provider>
	);
};
