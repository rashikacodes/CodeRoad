import { Router } from "express";
import {
  createProblem,
  getAllProblems,
  getProblemBySlug,
} from "../controllers/problemController";
import { authenticate, adminOnly } from "../middleware/auth";

const router = Router();

router.get("/", getAllProblems);
router.get("/:slug", getProblemBySlug);

router.post("/", authenticate, adminOnly, createProblem);

export default router;