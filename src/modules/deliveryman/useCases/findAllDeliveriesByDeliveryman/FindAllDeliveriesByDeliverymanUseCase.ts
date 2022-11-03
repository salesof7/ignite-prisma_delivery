import { prisma } from "../../../../database/prismaClient";

class FindAllDeliveriesByDeliverymanUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman,
      },
      select: {
        deliveries: true,
        id: true,
        username: true,
      },
    });

    return deliveries;
  }
}

export { FindAllDeliveriesByDeliverymanUseCase };
