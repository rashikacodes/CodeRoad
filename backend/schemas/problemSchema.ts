import { z } from "zod";

const exampleSchema = z.object({
  input: z.string().min(1, "Example input is required"),
  output: z.string().min(1, "Example output is required"),
  explanation: z.string().optional(), 
});

const testCaseSchema = z.object({
  input: z.string().min(1, "Test case input is required"),
  expectedOutput: z.string().min(1, "Expected output is required"),
});

const hintSchema = z.object({
  level: z.number().min(1).max(6), 
  content: z.string().min(1, "Hint content is required"),
});

export const createProblemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  slug: z
    .string()
    .min(2)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens"
    ),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  difficulty: z.enum(["Easy", "Medium", "Hard"]),

  topics: z.array(z.string()).min(1, "At least one topic is required"),

  companies: z.array(z.string()).optional().default([]),

  constraints: z.string().min(1, "Constraints are required"),

  examples: z
    .array(exampleSchema)
    .min(1, "At least one example is required"),

  starterCode: z.string().min(1, "Starter code is required"),

  supportedLanguages: z.array(z.string()).optional().default(["cpp"]),

  timeLimit: z.number().optional().default(1000),   // 1 second default
  memoryLimit: z.number().optional().default(256),  // 256 MB default

  visibleTestCases: z
    .array(testCaseSchema)
    .min(1, "At least one visible test case is required"),

  hiddenTestCases: z
    .array(testCaseSchema)
    .min(1, "At least one hidden test case is required"),

  hintLadder: z
    .array(hintSchema)
    .min(1, "At least one hint is required"),

  editorial: z.string().optional(),
});
export type CreateProblemInput = z.infer<typeof createProblemSchema>;