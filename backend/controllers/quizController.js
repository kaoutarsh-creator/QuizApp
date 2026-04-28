import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";

// Create Quiz
export const createQuiz = async (req, res) => {
  const quiz = await Quiz.create(req.body);
  res.json(quiz);
};

// Get All Quizzes
export const getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};

// Update Quiz
export const updateQuiz = async (req, res) => {
  const quiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(quiz);
};

// Delete Quiz
export const deleteQuiz = async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// Add Question
export const addQuestion = async (req, res) => {
  const question = await Question.create(req.body);
  res.json(question);
};

// Submit Quiz (simple version)
export const submitQuiz = (req, res) => {
  const { quizId, answers } = req.body;

  const score = answers?.length || 0;

  res.status(200).json({
    message: "Quiz submitted successfully",
    quizId,
    answers,
    score
  });
};