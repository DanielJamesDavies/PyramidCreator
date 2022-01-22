// Packages
import { FaChevronRight, FaPlus, FaTimes } from "react-icons/fa";

// Components
import { DragDropContainer } from "../DragDropContainer/DragDropContainer";
import { DragDropItem } from "../DragDropItem/DragDropItem";

// Logic
import { ItemLogic } from "./ItemLogic";

// Context

// Styles
import "./Item.css";

// Assets

export const Item = () => {
	const { selectedItem, previousSelectedItem, isEditing, closeSelectedItem, changeTitle, changeText, removeNote, onDropNote, addNote } =
		ItemLogic();

	if (!selectedItem && !previousSelectedItem) return null;

	if (isEditing && !selectedItem && previousSelectedItem)
		return (
			<div className='item-container item-container-editing item-container-hide'>
				<div className='item-top-bar'>
					<button className='item-top-bar-back-btn' onClick={() => {}}>
						<FaChevronRight />
					</button>
					<div className='item-top-bar-title'>{previousSelectedItem.value}</div>
				</div>

				{previousSelectedItem.notes.length !== 0 ? null : (
					<>
						<p className='item-begin-label'>To add notes to this element, press the "Add Note" button below.</p>
					</>
				)}

				<div className='notes'>
					{previousSelectedItem.notes.map((note, index) => (
						<div key={index} className='note'>
							<div className='note-title'>
								<input value={note.title} onChange={() => {}} placeholder='Title' />
							</div>

							<button className='note-remove-btn' onClick={() => {}}>
								<FaTimes />
							</button>

							<div className='note-text'>
								<textarea value={note.text.join("\n")} onChange={() => {}} placeholder='Text' />
							</div>
						</div>
					))}
				</div>

				<div className='note-add-btn-container'>
					<button className='note-add-btn' onClick={addNote}>
						<FaPlus />
					</button>
				</div>
			</div>
		);

	if (isEditing && selectedItem)
		return (
			<div className='item-container item-container-editing'>
				<div className='item-top-bar'>
					<button className='item-top-bar-back-btn' onClick={closeSelectedItem}>
						<FaChevronRight />
					</button>
					<div className='item-top-bar-title'>{selectedItem.value}</div>
				</div>

				{selectedItem.notes.length !== 0 ? null : (
					<>
						<p className='item-begin-label'>To add notes to this element, press the "Add Note" button below.</p>
					</>
				)}

				<DragDropContainer className='notes' itemsAreInline={false} onDropItem={onDropNote}>
					{selectedItem.notes.map((note, index) => (
						<DragDropItem key={index} index={index} className='note'>
							<div className='note-title prevent-drag'>
								<input value={note.title} onChange={(e) => changeTitle(e, index)} placeholder='Title' />
							</div>

							<button className='note-remove-btn' onClick={() => removeNote(index)}>
								<FaTimes />
							</button>

							<div className='note-text prevent-drag'>
								<textarea value={note.text.join("\n")} onChange={(e) => changeText(e, index)} placeholder='Text' />
							</div>
						</DragDropItem>
					))}
				</DragDropContainer>

				<div className='note-add-btn-container'>
					<button className='note-add-btn' onClick={addNote}>
						<FaPlus />
					</button>
				</div>
			</div>
		);

	if (!selectedItem && previousSelectedItem)
		return (
			<div className='item-container item-container-hide'>
				<div className='item-top-bar'>
					<button className='item-top-bar-back-btn' onClick={() => {}}>
						<FaChevronRight />
					</button>
					<div className='item-top-bar-title'>{previousSelectedItem.value}</div>
				</div>

				{previousSelectedItem.notes.length !== 0 ? null : (
					<>
						<p className='item-begin-label'>
							To add notes to this element, press the "Edit" button on the sidebar and then press the "Add Note" button that contains
							a plus symbol.
						</p>
					</>
				)}

				<div className='notes'>
					{previousSelectedItem.notes.map((note, index) => (
						<div key={index} className='note'>
							{note.title.split(" ").join("") === "" ? null : <div className='note-title'>{note.title}</div>}
							<div className='note-text'>
								{note.text.map((paragraph, index) => (
									<p key={index}>{paragraph}</p>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		);

	return (
		<div className='item-container'>
			<div className='item-top-bar'>
				<button className='item-top-bar-back-btn' onClick={closeSelectedItem}>
					<FaChevronRight />
				</button>
				<div className='item-top-bar-title'>{selectedItem.value}</div>
			</div>

			{selectedItem.notes.length !== 0 ? null : (
				<>
					<p className='item-begin-label'>
						To add notes to this element, press the "Edit" button on the sidebar and then press the "Add Note" button that contains a
						plus symbol.
					</p>
				</>
			)}

			<div className='notes'>
				{selectedItem.notes.map((note, index) => (
					<div key={index} className='note'>
						{note.title.split(" ").join("") === "" ? null : <div className='note-title'>{note.title}</div>}
						<div className='note-text'>
							{note.text.map((paragraph, index) => (
								<p key={index}>{paragraph}</p>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
