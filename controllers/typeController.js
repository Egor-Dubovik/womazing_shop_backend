import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await models.Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    const type = await models.Type.findAll();
    return res.json(type);
  }
}

export default new TypeController();
