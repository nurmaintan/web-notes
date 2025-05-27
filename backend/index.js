import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import NotesRoute from "./routes/NotesRoute.js";
import db from "./config/database.js";

// Load environment variables
dotenv.config();

const app = express();

// CORS setup: hanya izinkan frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://frontend-notes-intan-dot-g-09-450802.uc.r.appspot.com",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(NotesRoute);

// Cek koneksi database sebelum menjalankan server
db.authenticate()
  .then(() => {
    console.log("Database connected.");
    app.listen(5000, () => console.log("server terhubung"));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
    process.exit(1); // Keluar dari proses jika gagal koneksi DB
  });
