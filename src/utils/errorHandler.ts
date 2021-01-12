import { RequestErrorHandler } from "../types";

export const errorHandler: RequestErrorHandler = (error, _req, res, _next) => {
  res.status(error.status).json({ message: error.message, data: error.data ?? {} });
};
