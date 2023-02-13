import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import models from "./models/models.js";
import cors from "cors"; // чтобы могли отправлять  запросы с браузера
import router from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

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
