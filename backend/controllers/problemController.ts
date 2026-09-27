import { Request, Response } from "express";
import { Problem } from "../models/Problem";
import { createProblemSchema } from "../schemas/problemSchema";
import { AuthRequest } from "../middleware/auth";


export async function createProblem(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const parsed = createProblemSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0].message });
      return;
    }

    const existing = await Problem.findOne({ slug: parsed.data.slug });
    if (existing) {
      res.status(409).json({ message: "A problem with this slug already exists" });
      return;
    }

    const problem = await Problem.create(parsed.data);

    res.status(201).json({
      message: "Problem created successfully",
      problem,
    });
  } catch (err) {
    console.error("createProblem error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getAllProblems(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const filter: Record<string, unknown> = {};

    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }

    if (req.query.topic) {
      filter.topics = req.query.topic;
    }

    if (req.query.company) {
      filter.companies = req.query.company;
    }

    const problems = await Problem.find(filter)
      .select("-hiddenTestCases") 
      .sort({ createdAt: -1 });  

    res.json({
      count: problems.length,
      problems,
    });
  } catch (err) {
    console.error("getAllProblems error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getProblemBySlug(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { slug } = req.params;

    const problem = await Problem.findOne({ slug })
      .select("-hiddenTestCases"); 
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }

    res.json({ problem });
  } catch (err) {
    console.error("getProblemBySlug error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}