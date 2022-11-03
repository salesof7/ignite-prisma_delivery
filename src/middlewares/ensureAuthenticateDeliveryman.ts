import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing!",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "66bd3a7351c47b6e1a32227d8c2aee58"
    ) as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token!",
    });
  }
}

export { ensureAuthenticateDeliveryman };
