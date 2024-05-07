import { Request, Response } from "express";

import { questionService } from "../services/question.services";

import {
  QuestionTableType,
  NewQuestionTableType,
} from "../../drizzle/schema/models/question.model";

import { TopicTagType } from "../../drizzle/schema/enums/enums";

// GET all questions
async function getAllQuestions(req: Request, res: Response) {
  try {
    console.log("Fetching all questions"); // debug

    // Fetch all questions from the database
    const fetchedQuestions = await questionService.getAllQuestions();
    console.log("Fetched questions:", fetchedQuestions); // debug

    return res.status(200).json({ success: true, data: fetchedQuestions });
  } catch (error) {
    console.error("Error fetching questions from database:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to get questions from database",
    });
  }
}

// GET question by id
async function getQuestionById(req: Request, res: Response) {
  try {
    console.log("Fetching question by id"); // debug
    const questionId = parseInt(req.params.id);
    console.log("Question ID:", questionId); // debug

    // Fetch question by id from the database
    const fetchedQuestion = await questionService.getQuestionById(questionId);

    // Guard clause
    if (!fetchedQuestion) {
      console.error("Question not found in database");

      return res.status(404).json({
        success: false,
        data: null,
        message: "Question not found in database",
      });
    }

    console.log("Fetched question:", fetchedQuestion); // debug

    return res.status(200).json({ success: true, data: fetchedQuestion });
  } catch (error) {
    console.error("Error fetching question from database:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to get question from database",
    });
  }
}

// GET all questions by topic
async function getQuestionsByTopic(req: Request, res: Response) {
  try {
    console.log("Fetching questions by topic"); // debug
    const topic = req.params.topic as TopicTagType;

    // Fetch questions by topic from the database
    const fetchedQuestions = await questionService.getQuestionsByTopic(topic);
    console.log("Fetched questions:", fetchedQuestions); // debug

    return res.status(200).json({ success: true, data: fetchedQuestions });
  } catch (error) {
    console.error("Error fetching questions from database:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to get questions from database",
    });
  }
}

export const questionController = {
  getAllQuestions,
  getQuestionsByTopic,
  getQuestionById,
};
