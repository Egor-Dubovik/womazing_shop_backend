import * as uuid from "uuid";
import path from "path";
import models from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductController {
  async create(req, res, next) {
    try {
      let { name, price, discount_price, typeId, brandId, info, size, color } = req.body;
      const { image } = req.files;

      let fileName = uuid.v4() + ".png";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const needSize = JSON.parse(size);

      const product = await models.Product.create({
        name,
        price,
        discount_price,
        size: needSize,
        // rating,
        typeId,
        brandId,
        image: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((element) => {
          models.ProductInfo.create({
            title: element.title,
            description: element.description,
            productId: product.id,
          });
        });
      }

      if (color) {
        color = JSON.parse(color);
        color.forEach((colorItem) => {
          models.ProductColor.create({
            name: colorItem.name,
            value: colorItem.value,
            productId: product.id,
          });
        });
      }

      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    let { typeId, brandId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 50;
    let offset = page * limit - limit;
    let product;

    if (!brandId && !typeId) {
      product = await models.Product.findAndCountAll({ limit, offset });
    }

    if (brandId && !typeId) {
      product = await models.Product.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }

    if (!brandId && typeId) {
      product = await models.Product.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }

    if (brandId && typeId) {
      product = await models.Product.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }

    return res.json(product);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await models.Product.findOne({
      where: { id },
      include: [
        { model: models.ProductInfo, as: "info" },
        { model: models.ProductColor, as: "color" },
      ],
    });
    return res.json(product);
  }
}

export default new ProductController();
