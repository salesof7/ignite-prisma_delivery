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

    const token = sign({ username }, "251f2638ef112921bdc0a98609f871c3", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}

export { AuthenticateDeliverymanUseCase };
