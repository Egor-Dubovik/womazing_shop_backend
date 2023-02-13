import ApiError from "../error/ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(5000).json({ message: "Unexpected error" });
};

export default errorHandler;
