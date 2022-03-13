// Packages

// Components

// Logic
import { DragDropItemLogic } from "./DragDropItemLogic";

// Context

// Styles
import "./DragDropItem.css";

// Assets

export const DragDropItem = ({
	children,
	index,
	itemsAreInline,
	draggingItem,
	setDraggingItem,
	setOrder,
	changedOrder,
	setChangedOrder,
	onDropItem,
	className,
	onClick,
}) => {
	const { dragDropItemContent, dragDropItemClassName, dragStart, dragOver, dragEnter, dragEnd } = DragDropItemLogic({ itemsAreInline });

	return (
		<div
			draggable='true'
			drag-key={index}
			className={dragDropItemClassName(className, index, draggingItem)}
			onDragStart={(e) => dragStart(e, children, setDraggingItem)}
			onDragEnd={() => dragEnd(setDraggingItem, changedOrder, onDropItem)}
			onClick={onClick === undefined ? () => {} : onClick}
		>
			<div
				className='drag-drop-item-drag'
				onDragOver={(e) => dragOver(e)}
				onDragEnter={(e) => dragEnter(e, draggingItem, setOrder, setChangedOrder)}
			></div>
			<div
				ref={dragDropItemContent}
				className='drag-drop-item-content'
				onDragOver={(e) => dragOver(e)}
				onDragEnter={(e) => dragEnter(e, draggingItem, setOrder, setChangedOrder)}
			>
				{children}
			</div>
		</div>
	);
};
