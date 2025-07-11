import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import { FaPlus, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import './App.css';
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { BASE_URL } from "./utils";

const ProfileMenu = () => {
  const { user, logout } = React.useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close menu if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-menu-container" ref={menuRef}>
      <button className="profile-icon-btn" onClick={() => setOpen((v) => !v)}>
        <FaUserCircle size={34} />
        <span className="profile-username">{user?.username}</span>
      </button>
      {open && (
        <div className="profile-dropdown-modern">
          <div className="profile-info">
            <FaUserCircle size={40} className="profile-avatar" />
            <div>
              <div className="profile-name">{user?.username}</div>
              <div className="profile-email-modern">{user?.email}</div>
            </div>
          </div>
          <button className="profile-logout-btn-modern" onClick={logout}>
            <FaSignOutAlt style={{ marginRight: 10, verticalAlign: "middle" }} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const MainApp = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");  
  const { user, logout } = React.useContext(AuthContext);

  // Fetch all notes from the API
  useEffect(() => {
    axios.get(`${BASE_URL}/notes`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  // Handle delete note
  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/delete-notes/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };

  // Handle select note for editing
  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  // Handle create or update note
  const handleSaveNote = (note) => {
    if (selectedNote) {
      // Update the note on the backend
      axios.put(`${BASE_URL}/edit-notes/${selectedNote.id}`, note)
        .then((response) => {
          // After successful update, update the state locally
          setNotes(notes.map(n => n.id === selectedNote.id ? { ...n, title: note.title, content: note.content } : n));
          setSelectedNote(null); // Reset the selected note
        })
        .catch((error) => {
          console.error('Error updating note:', error);
        });
    } else {
      // Create a new note if there's no selected note
      axios.post(`${BASE_URL}/add-notes`, note)
        .then((response) => {
          setNotes([...notes, response.data]);
          setSelectedNote(null); // Reset the form after creating the note
        })
        .catch((error) => {
          console.error('Error creating note:', error);
        });
    }
  };

  // Handle "Add New Note" button click
  const handleAddNewNote = () => {
    setSelectedNote(null); // Reset the selected note to clear the editor fields
  };

  // Filter notes based on the search term
  const filteredNotes = notes.filter((note) => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Profile icon di kanan atas */}
      <ProfileMenu />
      <div className="notes-list-container">
        <h2>🐻 All Notes</h2>
        {/* Tombol Logout */}
        
        {/* Search Input */}
        <input
          type="text"
          className="search-input"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        
        {/* Pass filtered notes to the NotesList */}
        <NotesList notes={filteredNotes} onDelete={handleDelete} onSelect={handleSelectNote} />
      </div>
      <div className="note-editor-container">
        <h2>{selectedNote ? 'simply view or edit your note 🐻‍❄️' : 'create a new note 🦇'}</h2>
        <NoteEditor note={selectedNote} onSave={handleSaveNote} />
      </div>
      
      {/* Add Plus Icon Button */}
      <button onClick={handleAddNewNote} className="add-note-btn">
        <FaPlus size={24} />
      </button>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;