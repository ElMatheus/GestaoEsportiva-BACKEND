import { Router } from "express";

import {
    getFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback,
} from "../controllers/feedback.controller.js";

const feedbackRouter = Router();

feedbackRouter.get("/", getFeedbacks);
feedbackRouter.get("/:id", getFeedbackById);
feedbackRouter.post("/", createFeedback);
feedbackRouter.put("/:id", updateFeedback);
feedbackRouter.delete("/:id", deleteFeedback);

export default feedbackRouter;