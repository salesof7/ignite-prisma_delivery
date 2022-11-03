import { Request, Response } from "express";
import { FindAllDeliveriesByDeliverymanUseCase } from "./FindAllDeliveriesByDeliverymanUseCase";

class FindAllDeliveriesByDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;

    const findAllDeliveriesByDeliverymanUseCase =
      new FindAllDeliveriesByDeliverymanUseCase();

    const result = await findAllDeliveriesByDeliverymanUseCase.execute(
      id_deliveryman
    );

    return response.json(result);
  }
}

export { FindAllDeliveriesByDeliverymanController };
