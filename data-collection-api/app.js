const express = require("express");
const app = express();
var cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(cors());

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

//append response to existing question in database
function updateQuestion(submissionData, requestData) {
  const updatedSubmissionData = submissionData.map((submissionGroup) => {
    if (submissionGroup.id === requestData.questionId) {
      const newId = submissionGroup.submissions.length; //since we dont have to worry about deletions, we can just generate a unique Id based off of size
      const newNumCorrect =
        submissionGroup.num_correct + (requestData.correct ? 1 : 0);
      const newTotal = submissionGroup.total + 1;
      submissionGroup.submissions.push({
        submissionId: newId,
        selectedId: requestData.selectedId,
        correct: requestData.correct,
      });

      return {
        ...submissionGroup,
        responseContent: requestData.responseContent,
        solutionId: requestData.solutionId,
        total: newTotal,
        num_correct: newNumCorrect,
      };
    } else {
      return submissionGroup;
    }
  });

  return updatedSubmissionData;
}

//add new question to database
function addQuestion(submissionData, requestData) {
  const newSubmissionData = {
    id: requestData.questionId,
    submissions: [
      {
        submissionId: "0",
        selectedId: requestData.selectedId,
        correct: requestData.correct,
      },
    ],
    responseContent: requestData.responseContent,
    solutionId: requestData.solutionId,
    total: 1,
    num_correct: requestData.correct ? 1 : 0,
  };

  submissionData.push(newSubmissionData);
  return submissionData;
}

//Receive information from API, then record it in data.json
app.post("/record", (request, response) => {
  fs.readFile("./data.json", "utf-8", function (err, data) {
    if (err) {
      return response.status(500).send({
        message: "Error reading JSON data",
        //pageContent: "<p>Welcome to the demo! Try switching to editor mode and press mod+enter to create a new multiple choice question.</p>",
        err,
      });
    }

    const submissionData = JSON.parse(data);

    if (!request.body) {
      return response.status(500).send({
        message: "Error recording data due to bad request",
        err,
      });
    }

    const exists = submissionData.find(
      (submissionGroup) => submissionGroup.id === request.body.questionId,
    );

    const updatedSubmissionData =
      exists !== undefined
        ? updateQuestion(submissionData, request.body)
        : addQuestion(submissionData, request.body);
    const json = JSON.stringify(updatedSubmissionData, null, 2);
    fs.writeFile("./data.json", json, "utf8", function (err, data) {
      if (err) {
        return response.status(500).send({
          message: "Error writing JSON data",
          err,
        });
      }
    });

    //If success, send back requested information
    return response.status(200).send({
      message: "Successfully recorded response",
    });
  });
});

module.exports = app;
