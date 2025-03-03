import React, { useState, useEffect } from "react";

const NoteEditor = ({ note, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // This useEffect hook will run when `note` changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent(""); // Reset the fields when note is null (for creating a new note)
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="note-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type here..."
        required
      />
      <button type="submit" className="save-btn">
        {note ? "Update Note" : "Create Note"}
      </button>
    </form>
  );
};

export default NoteEditor;
