// const practical = [
//   'Which option fits your budget, time, and current responsibilities better?',
//   'What is the biggest practical advantage of each option?',
// ];

// export function fallbackQuestions(optionA, optionB) {
//   return [
//     practical[0],
//     `What excites you most about ${optionA}, and what excites you about ${optionB}?`,
//     'Which option would benefit you more six months from now?',
//     'If nobody judged your choice, which one would you pick instinctively?',
//     'What fear or hesitation is stopping you from choosing either option?',
//   ];
// }

// function containsPreference(text, option) {
//   const normalized = text.toLowerCase();
//   return normalized.includes(option.toLowerCase()) ? 1 : 0;
// }

// export function fallbackDecision({ optionA, optionB, answers }) {
//   const fullText = answers.map((item) => item.answer).join(' ');
//   const aMentions = containsPreference(fullText, optionA);
//   const bMentions = containsPreference(fullText, optionB);
//   const finalRecommendation = bMentions > aMentions ? 'B' : 'A';
//   const winner = finalRecommendation === 'A' ? optionA : optionB;

//   return {
//     decisionCategory: 'other',
//     riskLevel: 'normal',
//     logicScore: { A: finalRecommendation === 'A' ? 7 : 6, B: finalRecommendation === 'B' ? 7 : 6 },
//     heartScore: { A: finalRecommendation === 'A' ? 7 : 6, B: finalRecommendation === 'B' ? 7 : 6 },
//     logicWinner: finalRecommendation,
//     heartWinner: finalRecommendation,
//     finalRecommendation,
//     confidence: 58,
//     reasoning: `Based on the emphasis in your answers, ${winner} appears to match your priorities slightly better. This is a demo-mode result because no Groq API key is configured, so the analysis is intentionally conservative. Add your API key to receive a fully personalised recommendation.`,
//     tradeoff: `Choosing ${winner} may mean giving up some benefits offered by the other option.`,
//     thingsToConsider: ['Review which answer mattered most to you.', 'Notice whether the recommendation feels relieving or disappointing.'],
//     safetyNote: '',
//   };
// }

const fallbackQuestionBank = [
  "What matters most to you when making this decision?",
  "What's your biggest concern about each option?",
  "Which option feels more exciting to you right now?",
  "Which option better supports your long-term goals?",
  "If both options had the same cost and risk, which would you naturally choose?",
  "What would you regret missing out on if you chose the other option?",
  "Which option seems more practical for your current situation?",
  "Which choice gives you greater peace of mind?",
  "What is the biggest advantage of Option A?",
  "What is the biggest advantage of Option B?",
  "What is the biggest drawback of Option A?",
  "What is the biggest drawback of Option B?"
];

export function fallbackQuestions(optionA, optionB) {
  return [
    fallbackQuestionBank[0],
    fallbackQuestionBank[1],
    fallbackQuestionBank[2],
    fallbackQuestionBank[3],
    fallbackQuestionBank[5]
  ];
}

function scoreAnswer(answer, keywords) {
  const text = answer.toLowerCase();

  let score = 0;

  keywords.forEach((word) => {
    if (text.includes(word)) score++;
  });

  return score;
}

export function fallbackDecision({ optionA, optionB, answers }) {
  const text = answers
    .map((a) => a.answer.toLowerCase())
    .join(" ");

  const positiveWords = [
    "love",
    "like",
    "prefer",
    "excited",
    "happy",
    "future",
    "growth",
    "better",
    "comfortable",
    "confident"
  ];

  const cautiousWords = [
    "safe",
    "stable",
    "secure",
    "practical",
    "budget",
    "easy",
    "simple"
  ];

  const optionAScore =
    scoreAnswer(text, [optionA.toLowerCase()]) +
    scoreAnswer(text, positiveWords);

  const optionBScore =
    scoreAnswer(text, [optionB.toLowerCase()]) +
    scoreAnswer(text, cautiousWords);

  const finalRecommendation =
    optionAScore >= optionBScore ? "A" : "B";

  const logicWinner = finalRecommendation;
  const heartWinner = finalRecommendation;

  return {
    decisionCategory: "other",

    riskLevel: "normal",

    logicScore: {
      A: finalRecommendation === "A" ? 8 : 6,
      B: finalRecommendation === "B" ? 8 : 6,
    },

    heartScore: {
      A: finalRecommendation === "A" ? 8 : 6,
      B: finalRecommendation === "B" ? 8 : 6,
    },

    logicWinner,

    heartWinner,

    finalRecommendation,

    confidence: 65,

    reasoning:
      finalRecommendation === "A"
        ? `Based on your answers, ${optionA} appears to align slightly better with the priorities you described. While both options have merit, your responses suggest this choice fits your current needs more closely.`
        : `Based on your answers, ${optionB} appears to align slightly better with the priorities you described. While both options have merit, your responses suggest this choice fits your current needs more closely.`,

    tradeoff:
      finalRecommendation === "A"
        ? `Choosing ${optionA} may mean giving up some advantages that ${optionB} could offer.`
        : `Choosing ${optionB} may mean giving up some advantages that ${optionA} could offer.`,

    thingsToConsider: [
      "Think about which benefit matters most to you.",
      "Consider how this choice might affect you in six months.",
      "Notice which recommendation feels more natural to accept."
    ],

    safetyNote: "",
  };
}