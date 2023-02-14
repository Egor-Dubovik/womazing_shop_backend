import ApiError from "../error/ApiError.js";
import models from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
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
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) return next(ApiError.internal("Пользователь с таким email не найден"));

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) return next(ApiError.internal("Указан не верный пароль"));

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("there isn't id"));
    }
    res.json(id);
  }
}

export default new UserController();
