// // // import { optionsSchema, questionsSchema, decideInputSchema, aiDecisionSchema } from '../schemas/decisionSchemas.js';
// // // import { generateQuestions, analyseDecision } from '../services/groqService.js';
// // // import { fallbackQuestions, fallbackDecision } from '../services/fallbackService.js';

// // // function sendValidationError(res, error) {
// // //   return res.status(400).json({ success: false, message: error.issues?.[0]?.message || 'Invalid input.' });
// // // }

// // // export async function getQuestions(req, res, next) {
// // //   try {
// // //     const parsed = optionsSchema.safeParse(req.body);
// // //     if (!parsed.success) return sendValidationError(res, parsed.error);

// // //     const { optionA, optionB } = parsed.data;
// // //     const aiResponse = await generateQuestions(optionA, optionB);
// // //     const candidate = aiResponse?.questions ?? aiResponse;
// // //     const checked = questionsSchema.safeParse(candidate);
// // //     const questions = checked.success ? checked.data : fallbackQuestions(optionA, optionB);

// // //     res.json({ success: true, questions, demoMode: !process.env.GROQ_API_KEY });
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // }

// // // export async function decide(req, res, next) {
// // //   try {
// // //     const parsed = decideInputSchema.safeParse(req.body);
// // //     if (!parsed.success) return sendValidationError(res, parsed.error);

// // //     const aiResponse = await analyseDecision(parsed.data);
// // //     const checked = aiDecisionSchema.safeParse(aiResponse);
// // //     const result = checked.success ? checked.data : fallbackDecision(parsed.data);

// // //     res.json({ success: true, result, demoMode: !process.env.GROQ_API_KEY || !checked.success });
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // }

// // // const aiResponse = await analyseDecision(parsed.data);

// // // console.log(aiResponse);

// // // const checked = aiDecisionSchema.safeParse(aiResponse);

// // // console.log("Schema success:", checked.success);

// // // if (!checked.success) {
// // //   console.dir(checked.error.issues, { depth: null });
// // // }


// // import {
// //   optionsSchema,
// //   questionsSchema,
// //   decideInputSchema,
// //   aiDecisionSchema,
// // } from "../schemas/decisionSchemas.js";

// // import {
// //   generateQuestions,
// //   analyseDecision,
// // } from "../services/groqService.js";

// // import {
// //   fallbackQuestions,
// //   fallbackDecision,
// // } from "../services/fallbackService.js";

// // function sendValidationError(res, error) {
// //   return res.status(400).json({
// //     success: false,
// //     message: error.issues?.[0]?.message || "Invalid input.",
// //   });
// // }

// // export async function getQuestions(req, res, next) {
// //   try {
// //     const parsed = optionsSchema.safeParse(req.body);

// //     if (!parsed.success) {
// //       return sendValidationError(res, parsed.error);
// //     }

// //     const { optionA, optionB } = parsed.data;

// //     const aiResponse = await generateQuestions(optionA, optionB);

// //     console.log("\n===== QUESTIONS FROM GROQ =====");
// //     console.dir(aiResponse, { depth: null });

// //     const candidate = aiResponse?.questions ?? aiResponse;

// //     const checked = questionsSchema.safeParse(candidate);

// //     console.log("Questions schema valid:", checked.success);

// //     const questions = checked.success
// //       ? checked.data
// //       : fallbackQuestions(optionA, optionB);

// //     res.json({
// //       success: true,
// //       questions,
// //       demoMode: !process.env.GROQ_API_KEY,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // }

// // // export async function decide(req, res, next) {
// // //   try {
// // //     const parsed = decideInputSchema.safeParse(req.body);

// // //     if (!parsed.success) {
// // //       return sendValidationError(res, parsed.error);
// // //     }

// // //     const aiResponse = await analyseDecision(parsed.data);

// // //     console.log("\n===== DECISION FROM GROQ =====");
// // //     console.dir(aiResponse, { depth: null });

// // //     const checked = aiDecisionSchema.safeParse(aiResponse);

// // //     console.log("Decision schema valid:", checked.success);

// // //     if (!checked.success) {
// // //       console.log("\n===== ZOD ERRORS =====");
// // //       console.dir(checked.error.issues, { depth: null });
// // //     }

// // //     const result = checked.success
// // //       ? checked.data
// // //       : fallbackDecision(parsed.data);

// // //     res.json({
// // //       success: true,
// // //       result,
// // //       demoMode: !process.env.GROQ_API_KEY || !checked.success,
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     next(error);
// // //   }
// // // }


// // export async function decide(req, res, next) {
// //   try {
// //     const parsed = decideInputSchema.safeParse(req.body);

// //     if (!parsed.success) {
// //       return sendValidationError(res, parsed.error);
// //     }

// //     const aiResponse = await analyseDecision(parsed.data);

// //     if (aiResponse) {

// //   if (aiResponse.logicWinner === "Neither") {
// //     aiResponse.logicWinner = aiResponse.finalRecommendation;
// //   }

// //   if (aiResponse.heartWinner === "Neither") {
// //     aiResponse.heartWinner = aiResponse.finalRecommendation;
// //   }

// // }

// //     console.log("\n===== PARSED AI RESPONSE =====");
// //     console.dir(aiResponse, { depth: null });

// //     const checked = aiDecisionSchema.safeParse(aiResponse);

// //     console.log("Decision schema valid:", checked.success);

// //     if (!checked.success) {
// //       console.log("\n===== SCHEMA ERRORS =====");
// //       console.dir(checked.error.format(), { depth: null });
// //     }

// //     const result = checked.success
// //       ? checked.data
// //       : fallbackDecision(parsed.data);

// //     res.json({
// //       success: true,
// //       result,
// //       demoMode: !process.env.GROQ_API_KEY || !checked.success,
// //     });
// //   } catch (error) {
// //     console.error("\n===== DECIDE ERROR =====");
// //     console.error(error);
// //     next(error);
// //   }
// // }


// import {
//   optionsSchema,
//   questionsSchema,
//   decideInputSchema,
//   aiDecisionSchema,
// } from "../schemas/decisionSchemas.js";

// import {
//   generateQuestions,
//   analyseDecision,
// } from "../services/groqService.js";

// import {
//   fallbackQuestions,
//   fallbackDecision,
// } from "../services/fallbackService.js";

// function sendValidationError(res, error) {
//   return res.status(400).json({
//     success: false,
//     message: error.issues?.[0]?.message || "Invalid input.",
//   });
// }

// // =====================
// // GET QUESTIONS
// // =====================
// export async function getQuestions(req, res, next) {
//   try {
//     const parsed = optionsSchema.safeParse(req.body);

//     if (!parsed.success) {
//       return sendValidationError(res, parsed.error);
//     }

//     const { optionA, optionB } = parsed.data;

//     const aiResponse = await generateQuestions(optionA, optionB);

//     console.log("===== QUESTIONS FROM GROQ =====");
//     console.dir(aiResponse, { depth: null });

//     const candidate = aiResponse?.questions ?? aiResponse;

//     const checked = questionsSchema.safeParse(candidate);

//     console.log("Questions schema valid:", checked.success);

//     if (!checked.success) {
//       console.log("===== QUESTION SCHEMA ERRORS =====");
//       console.dir(checked.error.format(), { depth: null });
//     }

//     const questions = checked.success
//       ? checked.data
//       : fallbackQuestions(optionA, optionB);

//     res.json({
//       success: true,
//       questions,
//       demoMode: !process.env.GROQ_API_KEY,
//     });
//   } catch (error) {
//     console.error("\n===== QUESTIONS ERROR =====");
//     console.error(error);
//     next(error);
//   }
// }

// // =====================
// // DECIDE
// // =====================
// export async function decide(req, res, next) {
//   try {
//     const parsed = decideInputSchema.safeParse(req.body);

//     if (!parsed.success) {
//       return sendValidationError(res, parsed.error);
//     }

//     const aiResponse = await analyseDecision(parsed.data);

//     // -----------------------------
//     // Safety Fix
//     // -----------------------------
//     if (aiResponse) {
//       if (
//         typeof aiResponse.logicWinner === "string" &&
//         aiResponse.logicWinner.trim().toLowerCase() === "neither"
//       ) {
//         aiResponse.logicWinner = aiResponse.finalRecommendation;
//       }

//       if (
//         typeof aiResponse.heartWinner === "string" &&
//         aiResponse.heartWinner.trim().toLowerCase() === "neither"
//       ) {
//         aiResponse.heartWinner = aiResponse.finalRecommendation;
//       }
//     }

//     console.log("\n===== PARSED AI RESPONSE =====");
//     console.dir(aiResponse, { depth: null });

//     const checked = aiDecisionSchema.safeParse(aiResponse);

//     console.log("Decision schema valid:", checked.success);

//     if (!checked.success) {
//       console.log("\n===== SCHEMA ERRORS =====");
//       console.dir(checked.error.format(), { depth: null });
//     }

//     const result = checked.success
//       ? checked.data
//       : fallbackDecision(parsed.data);

//     res.json({
//       success: true,
//       result,
//       demoMode: !process.env.GROQ_API_KEY || !checked.success,
//     });
//   } catch (error) {
//     console.error("\n===== DECIDE ERROR =====");
//     console.error(error);
//     next(error);
//   }
// }



import {
  optionsSchema,
  questionsSchema,
  decideInputSchema,
  aiDecisionSchema,
} from "../schemas/decisionSchemas.js";

import {
  generateQuestions,
  analyseDecision,
} from "../services/groqService.js";

import {
  fallbackQuestions,
  fallbackDecision,
} from "../services/fallbackService.js";

/* --------------------------------------------------
   Validation Error Helper
--------------------------------------------------- */

function sendValidationError(res, error) {
  return res.status(400).json({
    success: false,
    message: error.issues?.[0]?.message || "Invalid input.",
  });
}

/* --------------------------------------------------
   AI Response Normalizer
--------------------------------------------------- */

function normalizeAiResponse(aiResponse) {
  if (!aiResponse) return aiResponse;

  // Fix invalid winner values
  ["logicWinner", "heartWinner"].forEach((key) => {
    if (
      typeof aiResponse[key] === "string" &&
      ["neither", "equal", "tie"].includes(
        aiResponse[key].trim().toLowerCase()
      )
    ) {
      aiResponse[key] = aiResponse.finalRecommendation;
    }
  });

  // Round and clamp confidence
  if (typeof aiResponse.confidence === "number") {
    aiResponse.confidence = Math.max(
      50,
      Math.min(100, Math.round(aiResponse.confidence))
    );
  }

  // Ensure exactly three "things to consider"
  if (Array.isArray(aiResponse.thingsToConsider)) {
    aiResponse.thingsToConsider =
      aiResponse.thingsToConsider
        .filter(Boolean)
        .slice(0, 3);

    while (aiResponse.thingsToConsider.length < 3) {
      aiResponse.thingsToConsider.push(
        "Think about which option best matches your priorities."
      );
    }
  }

  return aiResponse;
}

/* --------------------------------------------------
   Generate Questions
--------------------------------------------------- */

export async function getQuestions(req, res, next) {
  try {
    const parsed = optionsSchema.safeParse(req.body);

    if (!parsed.success) {
      return sendValidationError(res, parsed.error);
    }

    const { optionA, optionB } = parsed.data;

    const aiResponse = await generateQuestions(optionA, optionB);

    console.log("\n===== QUESTIONS FROM GROQ =====");
    console.dir(aiResponse, { depth: null });

    const candidate = aiResponse?.questions ?? aiResponse;

    const checked = questionsSchema.safeParse(candidate);

    console.log("Questions schema valid:", checked.success);

    if (!checked.success) {
      console.log("\n===== QUESTION SCHEMA ERRORS =====");
      console.dir(checked.error.format(), { depth: null });
    }

    const questions = checked.success
      ? checked.data
      : fallbackQuestions(optionA, optionB);

    res.json({
      success: true,
      questions,
      demoMode: !process.env.GROQ_API_KEY,
    });
  } catch (error) {
    console.error("\n===== QUESTION GENERATION ERROR =====");
    console.error(error);

    next(error);
  }
}
/* --------------------------------------------------
   Analyse Decision
--------------------------------------------------- */

export async function decide(req, res, next) {
  try {
    const parsed = decideInputSchema.safeParse(req.body);

    if (!parsed.success) {
      return sendValidationError(res, parsed.error);
    }

    let aiResponse = await analyseDecision(parsed.data);

    // Normalize common AI mistakes before validation
    aiResponse = normalizeAiResponse(aiResponse);

    console.log("\n===== PARSED AI RESPONSE =====");
    console.dir(aiResponse, { depth: null });

    const checked = aiDecisionSchema.safeParse(aiResponse);

    console.log("Decision schema valid:", checked.success);

    if (!checked.success) {
      console.log("\n===== DECISION SCHEMA ERRORS =====");
      console.dir(checked.error.format(), { depth: null });
    }

    const usingFallback = !checked.success;

    const result = usingFallback
      ? fallbackDecision(parsed.data)
      : checked.data;

    console.log(
      usingFallback
        ? "\nUsing fallback decision."
        : "\nUsing AI decision."
    );

    res.json({
      success: true,
      result,
      demoMode: !process.env.GROQ_API_KEY || usingFallback,
    });
  } catch (error) {
    console.error("\n===== DECISION ERROR =====");
    console.error(error);

    next(error);
  }
}