import { Request, Response } from "express";
import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";

class FindAllAvailableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllWithoutEndDateUseCase = new FindAllAvailableUseCase();

    const result = await findAllWithoutEndDateUseCase.execute();

    return response.json(result);
  }
}

export { FindAllAvailableController };
