import ApiError from "../error/ApiError.js";

class UserController {
  async registration(req, res) {}

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("there isn't id"));
      // response.end();
    }
    res.json(id);
  }
}

export default new UserController();
