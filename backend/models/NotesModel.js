import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Notes = db.define("notes", {
  title: DataTypes.STRING,
  content: DataTypes.STRING,
});

db.sync().then(() => console.log("Database tersinkron"));

export default Notes;
