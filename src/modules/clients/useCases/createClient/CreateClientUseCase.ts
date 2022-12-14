import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { Clients } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";

interface ICreateClient {
  username: string;
  password: string;
}

class CreateClientUseCase {
  async execute({ username, password }: ICreateClient): Promise<Clients> {
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (clientExists) {
      throw new AppError("Client already exists");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}

export { CreateClientUseCase };
