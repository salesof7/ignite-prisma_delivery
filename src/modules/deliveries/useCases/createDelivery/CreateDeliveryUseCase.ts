import { Deliveries } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface ICreateDelivery {
  item_name: string;
  id_client: string;
}

class CreateDeliveryUseCase {
  async execute({
    item_name,
    id_client,
  }: ICreateDelivery): Promise<Deliveries> {
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        id_client,
      },
    });

    return delivery;
  }
}

export { CreateDeliveryUseCase };
