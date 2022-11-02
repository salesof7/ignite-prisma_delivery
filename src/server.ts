import express, { Request, Response, NextFunction, json } from "express";
import "express-async-errors";

import { AppError } from "./errors/AppError";
import { routes } from "./routes";
const app = express();

app.use(json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(400).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));
