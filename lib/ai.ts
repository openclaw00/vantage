import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export interface MarkingResult {
  score: number;
  maxScore: number;
  percentage: number;
  grade: "Excellent" | "Good" | "Satisfactory" | "Needs work" | "Incomplete";
  whatYouGotRight: string;
  whatsMissing: string;
  examinerTip: string;
  improvedAnswer: string;
}

export async function markAnswer(
  questionContent: string,
  markScheme: string,
  studentAnswer: string,
  maxMarks: number
): Promise<MarkingResult> {
  const systemPrompt = `You are an expert Cambridge examiner for IGCSE and A-Level examinations.
You are rigorous, fair, and constructive. You apply the mark scheme strictly but give partial credit
where appropriate. Your feedback is specific, actionable, and educational.

You MUST respond with valid JSON only — no additional text.`;

  const userPrompt = `QUESTION:
${questionContent}

OFFICIAL MARK SCHEME (${maxMarks} marks available):
${markScheme}

STUDENT'S ANSWER:
${studentAnswer}

Grade this answer against the mark scheme. Respond with JSON in exactly this format:
{
  "score": <integer 0-${maxMarks}>,
  "maxScore": ${maxMarks},
  "percentage": <integer 0-100>,
  "grade": <"Excellent"|"Good"|"Satisfactory"|"Needs work"|"Incomplete">,
  "whatYouGotRight": "<specific feedback on correct points — cite which mark scheme points they hit>",
  "whatsMissing": "<specific feedback on missed marks — quote the key phrases from the mark scheme they omitted>",
  "examinerTip": "<one actionable tip for how to improve — from an examiner's perspective>",
  "improvedAnswer": "<a model answer that would score full marks, written in the style of a top student>"
}

Grading guide: Excellent = 90-100%, Good = 70-89%, Satisfactory = 50-69%, Needs work = 25-49%, Incomplete = 0-24%.`;

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No response from AI");

  return JSON.parse(content) as MarkingResult;
}

export async function explainText(
  context: string,
  highlightedText: string,
  subject: string
): Promise<string> {
  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a brilliant ${subject} tutor. Explain concepts clearly and concisely
for a student studying at IGCSE/A-Level. Use analogies where helpful. Keep explanations
to 150 words maximum unless a longer explanation is genuinely needed.`,
      },
      {
        role: "user",
        content: `Context: "${context}"\n\nThe student has highlighted: "${highlightedText}"\n\nExplain this clearly.`,
      },
    ],
    temperature: 0.5,
    max_tokens: 400,
  });

  return response.choices[0].message.content ?? "Unable to generate explanation.";
}

export async function generatePracticeQuestion(
  topic: string,
  subject: string,
  difficulty: "EASY" | "MEDIUM" | "HARD",
  marks: number
): Promise<{ question: string; markScheme: string; examinerTip: string }> {
  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a Cambridge examiner creating exam questions.
Produce questions that are accurate, fair, and follow Cambridge mark scheme conventions.
Respond with valid JSON only.`,
      },
      {
        role: "user",
        content: `Create a ${difficulty.toLowerCase()} ${subject} exam question about "${topic}" worth ${marks} marks.
Follow Cambridge IGCSE/A-Level style exactly.
Respond with JSON: { "question": "...", "markScheme": "...", "examinerTip": "..." }`,
      },
    ],
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No response from AI");

  return JSON.parse(content);
}
