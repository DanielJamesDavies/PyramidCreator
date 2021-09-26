// Packages
import { FaPlus, FaTrash } from "react-icons/fa";

// Components
import { DragDropContainer } from "../DragDropContainer/DragDropContainer";
import { DragDropItem } from "../DragDropItem/DragDropItem";

// Logic
import { PyramidLogic } from "./PyramidLogic";

// Context

// Styles
import "./Pyramid.css";
import { PyramidValueInput } from "./PyramidValueInput";

// Assets

export const Pyramid = () => {
	const { pyramid, isEditing, tierSelected, changeName, onTierClick, changeValue, removeValue, onDropPyramidValueItem, addValue, addTier } =
		PyramidLogic();

	if (!pyramid) return <div className='pyramid-container'></div>;

	if (!isEditing)
		return (
			<div className='pyramid-container'>
				<div className='pyramid-name'>{pyramid.name}</div>
				<div className='pyramid'>
					{pyramid.tiers.length !== 0 ? null : (
						<>
							<p className='pyramid-begin-label'>To begin creating a pyramid hierarchy, press the "Edit" button on the sidebar.</p>
							<p className='pyramid-begin-label'>
								Alternatively, to import a pyramid hierarchy, press the "Import" button on the sidebar.
							</p>
						</>
					)}
					{pyramid.tiers.map((tier, index) => (
						<div key={index} className='pyramid-tier'>
							<div className='pyramid-tier-values'>
								{tier.map((value, index) => (
									<div key={index} className='pyramid-tier-value'>
										{value}
									</div>
								))}
							</div>
							<div className='pyramid-tier-background'></div>
						</div>
					))}
				</div>
			</div>
		);

	return (
		<div className='pyramid-container'>
			<div className='pyramid-name'>
				<input value={pyramid.name} onChange={changeName} placeholder='Name' />
			</div>
			<div className='pyramid'>
				{pyramid.tiers.map((tier, tierIndex) => (
					<div key={tierIndex} className='pyramid-tier' onClick={() => onTierClick(tierIndex)}>
						{tierSelected !== tierIndex ? (
							<div className='pyramid-tier-values'>
								<DragDropContainer itemsAreInline={false} onDropItem={(res) => onDropPyramidValueItem(res, tierIndex)}>
									{tier.map((value, valueIndex) => (
										<DragDropItem key={valueIndex} index={valueIndex} className='pyramid-tier-value'>
											<PyramidValueInput
												value={value}
												onChange={(e) => changeValue(e, tierIndex, valueIndex)}
												onRemove={(e) => removeValue(e, tierIndex, valueIndex)}
											/>
										</DragDropItem>
									))}
								</DragDropContainer>
								<div className='pyramid-tier-value-add-btn' onClick={(e) => addValue(e, tierIndex)}>
									<FaPlus />
								</div>
							</div>
						) : (
							<div className='pyramid-tier-hover-background'>
								<FaTrash />
							</div>
						)}
						<div className='pyramid-tier-background'></div>
					</div>
				))}
				{pyramid.tiers.length >= 5 ? null : (
					<div className='pyramid-tier-add-btn' onClick={addTier}>
						<FaPlus />
					</div>
				)}
			</div>
		</div>
	);
};
