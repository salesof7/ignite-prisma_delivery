import { Request, Response } from "express";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";

class UpdateEndDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_delivery } = request.params;
    const { id_deliveryman } = request;
    const updateEndDateUseCase = new UpdateEndDateUseCase();

    const result = await updateEndDateUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return response.json(result);
  }
}

export { UpdateEndDateController };
