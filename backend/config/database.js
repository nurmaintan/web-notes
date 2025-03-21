import { Sequelize } from "sequelize";

const db = new Sequelize("web_notes", "root", "intan123", {
  host: "35.192.112.107",
  dialect: "mysql",
});

export default db;
