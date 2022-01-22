// Packages
import { FaPlus, FaTrash, FaStickyNote } from "react-icons/fa";

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
	const {
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
	} = PyramidLogic();

	if (!pyramid) return <div className='pyramid-container'></div>;

	if (!isEditing)
		return (
			<div className='pyramid-container' onClick={(e) => selectItem(e)}>
				<div className='pyramid-name'>{pyramid.name}</div>
				<div className='pyramid'>
					{pyramid.tiers.length !== 0 ? null : (
						<>
							<p className='pyramid-begin-label'>To begin creating a pyramid hierarchy, press the "Edit" button on the sidebar.</p>
							<p className='pyramid-begin-label'>
								Alternatively, to open a pyramid hierarchy, press the "Open" button on the sidebar.
							</p>
						</>
					)}
					{pyramid.tiers.map((tier, tierIndex) => (
						<div key={tierIndex} className='pyramid-tier'>
							<div className='pyramid-tier-values'>
								{tier.map((element, valueIndex) => (
									<div key={valueIndex} className='pyramid-tier-value' onClick={(e) => selectItem(e, tierIndex, valueIndex)}>
										{element.value}
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
		<div className={!selectedItem ? "pyramid-container" : "pyramid-container pyramid-container-hide"}>
			<div className='pyramid-name'>
				<input value={pyramid.name} onChange={changeName} placeholder='Name' />
			</div>
			<div className='pyramid'>
				{pyramid.tiers.map((tier, tierIndex) => (
					<div key={tierIndex} className='pyramid-tier' onClick={() => onTierClick(tierIndex)} onDragEnter={() => setTierOver(tierIndex)}>
						{tierSelected !== tierIndex ? (
							<div className='pyramid-tier-values'>
								<DragDropContainer itemsAreInline={false} onDropItem={(res) => onDropPyramidValueItem(res, tierIndex)}>
									{tier.map((element, valueIndex) => (
										<DragDropItem key={valueIndex} index={valueIndex} className='pyramid-tier-value'>
											<PyramidValueInput
												value={element.value}
												onChange={(e) => changeValue(e, tierIndex, valueIndex)}
												onNotes={(e) => selectItem(e, tierIndex, valueIndex)}
												onRemove={(e) => removeItem(e, tierIndex, valueIndex)}
											/>
										</DragDropItem>
									))}
								</DragDropContainer>
								{tier.length >= 9 ? null : (
									<div className='pyramid-tier-value-add-btn' onClick={(e) => addValue(e, tierIndex)}>
										<FaPlus />
									</div>
								)}
							</div>
						) : (
							<div className='pyramid-tier-hover-background'>
								<FaTrash />
							</div>
						)}
						<div className='pyramid-tier-background'></div>
					</div>
				))}
				{pyramid.tiers.length >= 7 ? null : (
					<div className='pyramid-tier-add-btn' onClick={addTier}>
						<FaPlus />
					</div>
				)}
			</div>
		</div>
	);
};
