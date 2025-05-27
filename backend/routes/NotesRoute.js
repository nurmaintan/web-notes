import express from "express";
import { createNotes, deleteNotes, getNotes, updateNotes } from "../controller/NotesController.js";
import { login, logout, getUser, register } from "../controller/UserController.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

// Notes endpoints
router.get("/notes", getNotes);
router.post("/add-notes", createNotes);
router.put("/edit-notes/:id", updateNotes);
router.delete("/delete-notes/:id", deleteNotes);

// User endpoints
router.get("/users", getUser);
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/token", refreshToken);

export default router;