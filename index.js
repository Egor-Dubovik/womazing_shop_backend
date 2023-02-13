import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import models from "./models/models.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate(); //устанавливается подключение к базе данных
    await sequelize.sync(); //сверяет состояние базы данных с нашей схемой данных
    app.listen(PORT, () => console.log(`server started in port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
