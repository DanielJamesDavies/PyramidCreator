// Packages
import { FaTimes } from "react-icons/fa";

// Components

// Logic

// Context

// Styles
import "./Pyramid.css";

// Assets

export const PyramidValueInput = ({ value, onChange, onRemove }) => {
	return (
		<div className='pyramid-value-input' onClick={(e) => e.stopPropagation()}>
			<input value={value} onChange={onChange} placeholder='Value' />
			<button className='pyramid-value-input-remove-btn' onClick={onRemove}>
				<FaTimes />
			</button>
		</div>
	);
};
