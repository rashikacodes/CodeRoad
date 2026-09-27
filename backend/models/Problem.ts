import mongoose, { Schema, Document } from "mongoose";

export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ITestCase {
  input: string;
  expectedOutput: string;
}

export interface IHint {
  level: number;
  content: string;
}

export interface IProblem extends Document {
  title: string;
  slug: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  companies: string[];
  constraints: string;
  examples: IExample[];
  starterCode: string;
  supportedLanguages: string[];
  timeLimit: number;
  memoryLimit: number;
  visibleTestCases: ITestCase[];
  hiddenTestCases: ITestCase[];
  hintLadder: IHint[];
  editorial?: string;
  createdAt: Date;
  updatedAt: Date;
}


const problemSchema = new Schema<IProblem>(
  {
    title: { type: String, required: true, trim: true },

    slug: {
      type: String,
      required: true,
      unique: true,  
      lowercase: true,
      trim: true,
    },

    description: { type: String, required: true },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"], 
      required: true,
    },

    topics: [{ type: String }],     
    companies: [{ type: String }],  

    constraints: { type: String, required: true },

    examples: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String }, 
      },
    ],

    starterCode: { type: String, required: true },

    supportedLanguages: {
      type: [String],
      default: ["cpp"], 
    },

    timeLimit: { type: Number, default: 1000 },   
    memoryLimit: { type: Number, default: 256 },  

    visibleTestCases: [
      {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true },
      },
    ],

    hiddenTestCases: [
      {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true },
      },
    ],

    hintLadder: [
      {
        level: { type: Number, required: true },
        content: { type: String, required: true },
      },
    ],

    editorial: { type: String }, 
  },
  {
    timestamps: true, 
  }
);

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);