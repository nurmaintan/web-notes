import { Sequelize } from "sequelize";

const db = new Sequelize("web_notes", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
