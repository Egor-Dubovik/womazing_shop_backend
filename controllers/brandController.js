import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await models.Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brand = await models.Brand.findAll();
    return res.json(brand);
  }
}

export default new BrandController();
