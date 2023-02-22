import path from "path";
import models from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class basketController {
  async createProduct(req, res, next) {
    try {
      let { productId, basketId } = req.body;
      const product = await models.BasketProduct.create({ productId, basketId });

      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAllProduct(req, res) {
    const { basketId } = req.params;
    const products = await models.BasketProduct.findAndCountAll({ where: { basketId } });
    return res.json(products);
  }

  async getBasketInfo(req, res) {
    const { userId } = req.body;
    const product = await models.Basket.findOne({ where: { userId } });
    return res.json(product);
  }

  // async getOne(req, res) {
  //   const { id } = req.params;
  //   const product = await models.BasketProduct.findOne({ where: { id } });
  //   return res.json(product);
  // }

  async deleteProduct(req, res) {
    const { basketId } = req.params;
    const id = req.body.id;
    const product = await models.BasketProduct.destroy({ where: { id, basketId } });
    return res.json(product);
  }
}

export default new basketController();
