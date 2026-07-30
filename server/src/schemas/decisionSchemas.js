// import { z } from 'zod';

// export const optionsSchema = z.object({
//   optionA: z.string().trim().min(2).max(120),
//   optionB: z.string().trim().min(2).max(120),
// }).refine((data) => data.optionA.toLowerCase() !== data.optionB.toLowerCase(), {
//   message: 'The two options must be different.',
//   path: ['optionB'],
// });

// export const questionsSchema = z.array(z.string().trim().min(5).max(140)).length(5);

// export const decideInputSchema = optionsSchema.extend({
//   answers: z.array(z.object({
//     question: z.string().trim().min(5).max(180),
//     answer: z.string().trim().min(1).max(1000),
//   })).min(3).max(7),
// });

// const scorePair = z.object({
//   A: z.number().min(1).max(10),
//   B: z.number().min(1).max(10),
// });

// export const aiDecisionSchema = z.object({
//   decisionCategory: z.enum(['lifestyle', 'purchase', 'career', 'education', 'relationship', 'health', 'legal', 'finance', 'safety', 'other']),
//   riskLevel: z.enum(['normal', 'important', 'high']),
//   logicScore: scorePair,
//   heartScore: scorePair,
//   logicWinner: z.enum(['A', 'B']),
//   heartWinner: z.enum(['A', 'B']),
//   finalRecommendation: z.enum(['A', 'B']),
//   confidence: z.number().min(0).max(100),
//   reasoning: z.string().trim().min(20).max(900),
//   tradeoff: z.string().trim().min(10).max(400),
//   thingsToConsider: z.array(z.string().trim().min(5).max(220)).min(1).max(3),
//   safetyNote: z.string().trim().max(500).optional().default(''),
// });


import { z } from "zod";

/* --------------------------
   Option Validation
--------------------------- */

export const optionsSchema = z
  .object({
    optionA: z.string().trim().min(2).max(120),

    optionB: z.string().trim().min(2).max(120),
  })
  .refine(
    (data) =>
      data.optionA.trim().toLowerCase() !==
      data.optionB.trim().toLowerCase(),
    {
      message: "The two options must be different.",
      path: ["optionB"],
    }
  );

/* --------------------------
   Questions
--------------------------- */

export const questionsSchema = z
  .array(
    z.string().trim().min(8).max(140)
  )
  .length(5);

/* --------------------------
   User Answers
--------------------------- */

export const decideInputSchema =
  optionsSchema.extend({
    answers: z
      .array(
        z.object({
          question: z.string().trim().min(5).max(180),

          answer: z.string().trim().min(1).max(1000),
        })
      )
      .length(5),
  });

/* --------------------------
   Score Object
--------------------------- */

const scorePair = z.object({
  A: z.number().min(1).max(10),

  B: z.number().min(1).max(10),
});

/* --------------------------
   AI Response
--------------------------- */

export const aiDecisionSchema = z.object({
  decisionCategory: z.enum([
    "purchase",
    "career",
    "education",
    "relationship",
    "finance",
    "health",
    "legal",
    "lifestyle",
    "safety",
    "other",
  ]),

  riskLevel: z.enum([
    "normal",
    "important",
    "high",
  ]),

  logicScore: scorePair,

  heartScore: scorePair,

  logicWinner: z.enum(["A", "B"]),

  heartWinner: z.enum(["A", "B"]),

  finalRecommendation: z.enum(["A", "B"]),

  confidence: z
    .number()
    .min(50)
    .max(100),

  reasoning: z
    .string()
    .trim()
    .min(40)
    .max(900),

  tradeoff: z
    .string()
    .trim()
    .min(15)
    .max(400),

  thingsToConsider: z
    .array(
      z.string().trim().min(5).max(220)
    )
    .length(3),

  safetyNote: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default(""),
});