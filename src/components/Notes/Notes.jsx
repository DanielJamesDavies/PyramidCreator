// Packages
import { FaChevronLeft, FaPlus, FaTimes } from "react-icons/fa";

// Components
import { DragDropContainer } from "../DragDropContainer/DragDropContainer";
import { DragDropItem } from "../DragDropItem/DragDropItem";

// Logic
import { NotesLogic } from "./NotesLogic";

// Context

// Styles
import "./Notes.css";

// Assets

export const Notes = () => {
	const { selectedElement, previousSelectedElement, isEditing, closeSelectedElement, changeTitle, changeText, removeNote, onDropNote, addNote } =
		NotesLogic();

	if (!selectedElement && !previousSelectedElement) return null;

	if (isEditing && !selectedElement && previousSelectedElement)
		return (
			<div className='notes-container notes-container-hide'>
				<div className='notes-top-bar'>
					<button className='notes-top-bar-back-btn' onClick={() => {}}>
						<FaChevronLeft />
					</button>
					<div className='notes-top-bar-title'>{previousSelectedElement.value}</div>
				</div>

				{previousSelectedElement.notes.length !== 0 ? null : (
					<>
						<p className='notes-begin-label'>To add notes to this element, press the "Add Note" button below.</p>
					</>
				)}

				<div className='notes'>
					{previousSelectedElement.notes.map((note, index) => (
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

				<button className='note-add-btn' onClick={addNote}>
					<FaPlus />
				</button>
			</div>
		);

	if (isEditing && selectedElement)
		return (
			<div className='notes-container'>
				<div className='notes-top-bar'>
					<button className='notes-top-bar-back-btn' onClick={closeSelectedElement}>
						<FaChevronLeft />
					</button>
					<div className='notes-top-bar-title'>{selectedElement.value}</div>
				</div>

				{selectedElement.notes.length !== 0 ? null : (
					<>
						<p className='notes-begin-label'>To add notes to this element, press the "Add Note" button below.</p>
					</>
				)}

				<DragDropContainer className='notes' itemsAreInline={false} onDropItem={onDropNote}>
					{selectedElement.notes.map((note, index) => (
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

				<button className='note-add-btn' onClick={addNote}>
					<FaPlus />
				</button>
			</div>
		);

	if (!selectedElement && previousSelectedElement)
		return (
			<div className='notes-container notes-container-hide'>
				<div className='notes-top-bar'>
					<button className='notes-top-bar-back-btn' onClick={() => {}}>
						<FaChevronLeft />
					</button>
					<div className='notes-top-bar-title'>{previousSelectedElement.value}</div>
				</div>

				{previousSelectedElement.notes.length !== 0 ? null : (
					<>
						<p className='notes-begin-label'>
							To add notes to this element, press the "Edit" button on the sidebar and then press the "Add Note" button that contains
							a plus symbol.
						</p>
					</>
				)}

				<div className='notes'>
					{previousSelectedElement.notes.map((note, index) => (
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
		<div className='notes-container'>
			<div className='notes-top-bar'>
				<button className='notes-top-bar-back-btn' onClick={closeSelectedElement}>
					<FaChevronLeft />
				</button>
				<div className='notes-top-bar-title'>{selectedElement.value}</div>
			</div>

			{selectedElement.notes.length !== 0 ? null : (
				<>
					<p className='notes-begin-label'>
						To add notes to this element, press the "Edit" button on the sidebar and then press the "Add Note" button that contains a
						plus symbol.
					</p>
				</>
			)}

			<div className='notes'>
				{selectedElement.notes.map((note, index) => (
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
