import { Request, Response } from "express";

import { exampleService } from "../services/example.services";

import {
  ExampleTableType,
  NewExampleTableType,
} from "../../drizzle/schema/models/example.model";

// GET all examples by question id
async function getExampleByQuestionId(req: Request, res: Response) {
  try {
    console.log("Fetching example by question id"); // debug
    const questionId = parseInt(req.params.id);
    console.log("Question ID:", questionId); // debug

    // Fetch example by question id from the database
    const fetchedExample = await exampleService.getExamplesByQuestionId(
      questionId
    );

    // Guard clause
    if (!fetchedExample) {
      console.error("Example not found in database");

      return res.status(404).json({
        success: false,
        data: null,
        message: "Example not found in database",
      });
    }

    console.log("Fetched example:", fetchedExample); // debug

    return res.status(200).json({ success: true, data: fetchedExample });
  } catch (error) {
    console.error("Error fetching example from database:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to get example from database",
    });
  }
}

export const exampleController = {
  getExampleByQuestionId,
};