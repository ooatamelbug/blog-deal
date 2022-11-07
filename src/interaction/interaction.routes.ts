import { Router } from "express";
import { Auth } from "../middleware/auth";
import InteractionController from "./interaction.controller";

class InteractionsRoutes {
  private readonly interactionsController: InteractionController;
  public router: Router;
  constructor(injectController: InteractionController) {
    this.interactionsController = injectController;
    this.router = Router();
  }

  getRouter() {
    // comments router
    this.router.post("/", Auth, (req, res, next) =>
      this.interactionsController.createInteraction(req, res, next)
    );
    return this.router;
  }
}

export default InteractionsRoutes;
