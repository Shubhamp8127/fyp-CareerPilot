import { getNextQuestionFromGemini } from "../services/geminiQuizService.js";

export const getNextQuestion = async (req, res) => {
  try {
    const { prevAnswer, questionIndex } = req.body;

    if (questionIndex >= 10) {
      return res.json({ completed: true });
    }

    const questionData = await getNextQuestionFromGemini(
      prevAnswer,
      questionIndex
    );

    res.json(questionData);
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate question",
    });
  }
};
