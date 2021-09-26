import React, { createContext, useState } from "react";

export const PyramidContext = createContext();

// eslint-disable-next-line
export default ({ children }) => {
	const [pyramid, setPyramid] = useState({ name: "", tiers: [] });
	const [isEditing, setIsEditing] = useState(false);

	return <PyramidContext.Provider value={{ pyramid, setPyramid, isEditing, setIsEditing }}>{children}</PyramidContext.Provider>;
};
