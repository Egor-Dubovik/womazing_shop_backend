import ApiError from "../error/ApiError.js";
import models from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwt = (id, basketId, email, role) => {
  return jwt.sign({ id, basketId, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email && !password) return next(ApiError.badRequest("Некорректный email или password"));

    const candidate = await models.User.findOne({ where: { email } });
    if (candidate) return next(ApiError.badRequest("Пользователь с таким email уже существует"));

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await models.User.create({ email, password: hashPassword, role });
    const basket = await models.Basket.create({ userId: user.id });
    const token = generateJwt(user.id, basket.id, user.email, user.role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) return next(ApiError.internal("Пользователь с таким email не найден"));

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) return next(ApiError.internal("Указан не верный пароль"));

    const basketInfo = await models.Basket.findOne({ where: { userId: user.id } });

    const token = generateJwt(user.id, basketInfo.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const { id, basketId, email, role } = req.user;
    const token = generateJwt(id, basketId, email, role);
    res.json({ token });
  }

  async getAll(req, res) {
    try {
      const users = await models.User.findAndCountAll();
      return res.json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return next(ApiError.badRequest("не указан id"));
      const user = await models.User.destroy({ where: { id } });
      return res.json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new UserController();
