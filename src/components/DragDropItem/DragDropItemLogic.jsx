// Packages
import { useRef, cloneElement, useEffect, useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const DragDropItemLogic = ({ itemsAreInline }) => {
	const [preventDrag, setPreventDrag] = useState(false);
	const dragDropItemContent = useRef();

	function dragDropItemClassName(className, index, draggingItem) {
		var newClassName = "drag-drop-item";
		if (preventDrag) newClassName += " drag-drop-item-prevent-drag";
		if (className) newClassName += " " + className;
		if (itemsAreInline) newClassName += " drag-drop-item-inline";
		if (draggingItem && draggingItem.props.dragkey === index) newClassName += " drag-drop-item-dragging";
		return newClassName;
	}

	function dragStart(e, children, setDraggingItem) {
		var foundDragKey = false;
		while (!foundDragKey) {
			if (!e.target.classList || !Array.from(e.target.classList).includes("drag-drop-item")) {
				e.target = e.target.parentNode;
			} else {
				foundDragKey = true;
			}
		}
		var dragkey = parseInt(e.target.getAttribute("drag-key"));
		if (isNaN(dragkey)) dragkey = -1;
		var newDraggingItem = cloneElement(children, { dragkey });
		if (setDraggingItem !== undefined) setDraggingItem(newDraggingItem);
	}

	function dragContentStart() {
		setPreventDrag(true);
	}

	function dragContentEnd() {
		setPreventDrag(false);
	}

	useEffect(() => {
		// eslint-disable-next-line
		if (dragDropItemContent && dragDropItemContent.current)
			// eslint-disable-next-line
			Array.from(dragDropItemContent.current.childNodes).map((child) => {
				if (child.className.includes("prevent-drag")) child.addEventListener("mousedown", dragContentStart);
				if (child.className.includes("prevent-drag")) child.addEventListener("mouseup", dragContentEnd);
				return true;
			});
		return () => {
			// eslint-disable-next-line
			if (dragDropItemContent && dragDropItemContent.current)
				// eslint-disable-next-line
				Array.from(dragDropItemContent.current.childNodes).map((child) => {
					if (child.className.includes("prevent-drag")) child.removeEventListener("mousedown", dragContentStart);
					if (child.className.includes("prevent-drag")) child.removeEventListener("mouseup", dragContentEnd);
					return true;
				});
		};
	});

	function dragOver(e) {
		e.preventDefault();
	}

	function dragEnter(e, draggingItem, order, setOrder, setChangedOrder) {
		if (draggingItem) {
			if (e.target.parentNode && e.target.parentNode.classList && e.target.parentNode.classList.contains("drag-drop-item"))
				return moveOrderItem(
					draggingItem.props.dragkey,
					parseInt(e.target.parentNode.getAttribute("drag-key")),
					order,
					setOrder,
					setChangedOrder
				);
			if (
				e.target.parentNode.parentNode &&
				e.target.parentNode.parentNode.classList &&
				e.target.parentNode.parentNode.classList.contains("drag-drop-item")
			)
				return moveOrderItem(
					draggingItem.props.dragkey,
					parseInt(e.target.parentNode.parentNode.getAttribute("drag-key")),
					order,
					setOrder,
					setChangedOrder
				);
		}
	}

	function moveOrderItem(source, destination, setOrder, setChangedOrder) {
		if (isNaN(destination)) return;

		setOrder((oldOrder) => {
			var newOrder = JSON.parse(JSON.stringify(oldOrder));

			var sourceIndex = newOrder.indexOf(source);
			var destinationIndex = newOrder.indexOf(destination);
			if (sourceIndex === -1 || destinationIndex === -1) return newOrder;

			newOrder.splice(destinationIndex, 0, newOrder.splice(sourceIndex, 1)[0]);

			setChangedOrder({ source: source, destination: destinationIndex });
			return newOrder;
		});
	}

	function dragEnd(setDraggingItem, changedOrder, onDropItem) {
		if (setDraggingItem !== undefined) setDraggingItem(false);
		onDropItem(changedOrder);
	}

	return { dragDropItemContent, dragDropItemClassName, dragStart, dragOver, dragEnter, dragEnd };
};
