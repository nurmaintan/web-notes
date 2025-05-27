import React from "react";

const NotesList = ({ notes, onDelete, onSelect }) => {
  return (
    <div className="notes-list">
      {notes.map(note => (
        <div key={note.id} className="note-item">
          <div className="note-preview" onClick={() => onSelect(note)}>
            <h3>{note.title}</h3>
            <p>{note.content.substring(0, 50)}</p>
          </div>
          <button onClick={() => onDelete(note.id)} className="delete-btn">
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
