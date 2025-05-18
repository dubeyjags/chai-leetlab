import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  submitBatch,
  pollBatchResults,
} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  // get all the data from the request body
  console.log("createProblem called");
  console.log(req.body);

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
  //
  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ error: "You are not allowed to create a problem" });
  }

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res
          .status(400)
          .json({ message: `Language ${language} is not supported` });
      }
      const submissions = testcases.map(({ input, output }) => ({
        stdin: input,
        expected_output: output,
        language_id: languageId,
        source_code: solutionCode,
      }));

      const submissionResults = await submitBatch(submissions);
      console.log("submissionResult", submissionResults);

      const tokens = await submissionResults.map((result) => result.token);
      console.log("tokens", tokens);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("result----", result);

        if (result.status.id !== 3) {
          return res
            .status(400)
            .json({
              error: `Test case ${i + 1} failed for language ${language}`,
            });
        }
      }

      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        status: "success",
        message: "Problem created successfully",
        problem: newProblem,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany();
    if (!problems) {
      return res.status(404).json({ message: "No problems found" });
    }
    res.status(200).json({
      status: "success",
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue fetching problems",
      error: error.message,
    });
  }
};
export const getProblemById = async (req, res) => {
  const { id } = req.params;
  console.log("getProblemById called");

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Problem fetched successfully",
      problem,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue fetching problem by id",
      error: error.message,
    });
  }
};
export const updateProblem = async (req, res) => {
  const { id } = req.params;
  console.log("updateProblem called");
  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found by id" });
    }
    const updatedProblem = await db.problem.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue updating problem by id",
      error: error.message,
    });
  }
};
export const deleteProblem = async (req, res) => {
  const { id } = req.params;
  console.log("deleteProblem called");

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    await db.problem.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Problem deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue deleting problem by id",
      error: error.message,
    });
  }
};

export const getSolvedProblems = async (req, res) => {
  const { userId } = req.params;
  console.log("getSolvedProblems called");
  try {
    const solvedProblems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId,
          },
        },
      },
      include: {
        solvedBy: {
          userId
        },
      },
    });
    if (!solvedProblems) {
      return res.status(404).json({ message: "No solved problems found" });
    }
    res.status(200).json({
      status: "success",
      message: "Solved problems fetched successfully",
      solvedProblems,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "problem fetching solved problems",
      error: error.message,
    });
  }
};
