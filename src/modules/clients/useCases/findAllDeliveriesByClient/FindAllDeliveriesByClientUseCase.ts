import { Deliveries } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";

interface IResponse {
  id: string;
  Deliveries: Deliveries[];
  username: string;
}

class FindAllDeliveriesByClientUseCase {
  async execute(id_client: string): Promise<IResponse[]> {
    const deliveries = await prisma.clients.findMany({
      where: {
        id: id_client,
      },
      select: {
        Deliveries: true,
        id: true,
        username: true,
      },
    });

    return deliveries;
  }
}

export { FindAllDeliveriesByClientUseCase };
