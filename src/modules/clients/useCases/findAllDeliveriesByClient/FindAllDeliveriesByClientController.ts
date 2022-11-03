import { Request, Response } from "express";
import { FindAllDeliveriesByClientUseCase } from "./FindAllDeliveriesByClientUseCase";

class FindAllDeliveriesByClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_client } = request;

    const findAllDeliveriesByClientUseCase =
      new FindAllDeliveriesByClientUseCase();

    const result = await findAllDeliveriesByClientUseCase.execute(id_client);

    return response.json(result);
  }
}

export { FindAllDeliveriesByClientController };
