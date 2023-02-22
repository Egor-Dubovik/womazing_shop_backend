import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import models from "./models/models.js";
import cors from "cors"; // чтобы могли отправлять  запросы с браузера
import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHandler); // ошибки обрабатываем всегда в конце

const start = async () => {
  try {
    await sequelize.authenticate(); //устанавливается подключение к базе данных
    await sequelize.sync({ alter: true }); //сверяет состояние базы данных с нашей схемой данных
    app.listen(PORT, () => console.log(`server started in port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
