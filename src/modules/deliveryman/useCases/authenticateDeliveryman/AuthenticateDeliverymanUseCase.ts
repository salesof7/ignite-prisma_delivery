import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

class AuthenticateDeliverymanUseCase {
  async execute({
    username,
    password,
  }: IAuthenticateDeliveryman): Promise<string> {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new AppError("Username or password invalid!");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new AppError("Username or password invalid!");
    }

    const token = sign({ username }, "66bd3a7351c47b6e1a32227d8c2aee58", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}

export { AuthenticateDeliverymanUseCase };
