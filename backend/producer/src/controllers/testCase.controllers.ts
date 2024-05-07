import { Request, Response } from "express";

import { testCaseService } from "../services/testCase.services";

import {
  TestCaseTableType,
  NewTestCaseTableType,
} from "../../drizzle/schema/models/testCase.model";

// GET all test cases by question id
async function getTestCasesByQuestionId(req: Request, res: Response) {
  try {
    console.log("Fetching test case by question id"); // debug
    const questionId = parseInt(req.params.id);
    console.log("Question ID:", questionId); // debug

    // Fetch test case by question id from the database
    const fetchedTestCase =
      await testCaseService.getTestCasesByQuestionId(questionId);

    // Guard clause
    if (!fetchedTestCase) {
      console.error("Test case not found in database");

      return res.status(404).json({
        success: false,
        data: null,
        message: "Test case not found in database",
      });
    }

    console.log("Fetched test case:", fetchedTestCase); // debug

    return res.status(200).json({ success: true, data: fetchedTestCase });
  } catch (error) {
    console.error("Error fetching test case from database:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to get test case from database",
    });
  }
}

export const testCaseController = {
  getTestCasesByQuestionId,
};