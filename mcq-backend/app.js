const express = require("express");
const app = express();
var cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

app.use(express.json());
app.use(cors());

//use npm start
//or for dev, use npm run dev to run nodemon

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

/*
 *   Page Content Handlers
 */
app.get("/pageContent", (request, response) => {
  const fs = require("fs");
  fs.readFile("./pageContent.txt", "utf-8", function (err, data) {
    if (err) {
      return response.status(500).send({
        message: "Error reading page content",
        //pageContent: "<p>Welcome to the demo! Try switching to editor mode and press mod+enter to create a new multiple choice question.</p>",
        err,
      });
    }

    //If success, send back requested information
    return response.status(200).send({
      message: "Successfully retrieved page content",
      pageContent: data,
    });
  });
});

app.post("/pageContent", (request, response) => {
  fs.writeFile(
    "./pageContent.txt",
    request.body.pageContent,
    "utf8",
    function (err, data) {
      if (err) {
        return response.status(500).send({
          message: "Error writing page content",
          err,
        });
      }
    },
  );

  //If success, send success status
  return response.status(200).send({
    message: "Successfully updated page content",
  });
});

/*
 *   Question Data Handlers
 */
app.get("/questions", (request, response) => {
  const fs = require("fs");
  fs.readFile("./question-data.json", "utf-8", function (err, data) {
    if (err) {
      return response.status(500).send({
        message: "Error reading JSON data",
        err,
      });
    }

    //convert JSON string into JavaScript object (array)
    const questions = JSON.parse(data);

    //extract the requested question you want from JS obj
    const req_question = questions.find(
      (question) => question.id === request.query.id,
    );

    //check if there was a matching id value
    if (!req_question) {
      return response.status(404).send({
        message: "Could not find requested question",
      });
    }

    //If success, send back requested information
    return response.status(200).send({
      message: "Successfully found requested question",
      questionData: req_question,
    });
  });
});

app.post("/update", (request, response) => {
  //confirm newQuestionData.id is in request
  if (!request.body.newQuestionData.id) {
    return response.status(400).send({
      message: "Request missing newQuestionData",
      err,
    });
  }

  fs.readFile("./question-data.json", "utf-8", function (err, data) {
    if (err) {
      return response.status(500).send({
        message: "Error reading JSON data",
        err,
      });
    }

    //convert JSON string into JavaScript object
    const questions = JSON.parse(data);

    const updatedTaskList = questions.map((question) => {
      if (question.id === request.body.newQuestionData.id) {
        return {
          ...question,
          data: request.body.newQuestionData.data,
        };
      } else {
        return question;
      }
    });

    //overwrite entire file with new JSON content
    const json = JSON.stringify(updatedTaskList, null, 2);
    fs.writeFile("./question-data.json", json, "utf8", function (err, data) {
      if (err) {
        return response.status(500).send({
          message: "Error writing JSON data",
          err,
        });
      }
    });

    //If success, send success status
    return response.status(200).send({
      message: "Successfully updated requested question",
    });
  });
});

app.post("/create", (request, response) => {
  const fs = require("fs");
  fs.readFile("./question-data.json", "utf-8", function (err, data) {
    if (err) {
      return response.status(500).send({
        message: "Error reading JSON data",
        err,
      });
    }

    //convert JSON string into JavaScript object
    const questions = JSON.parse(data);

    //randomly generate new question id value
    const new_id = uuidv4();
    request.body.newQuestionData.id = "question-" + new_id.toString();

    //append new question onto JavaScript object
    questions.push(request.body.newQuestionData);

    //write data to json file
    const json = JSON.stringify(questions, null, 2);
    fs.writeFile("./question-data.json", json, "utf8", function (err, data) {
      if (err) {
        return response.status(500).send({
          message: "Error writing JSON data",
          err,
        });
      }
    });

    //If success, send success status and new id to update frontend id
    return response.status(200).send({
      message: "Successfully created requested question",
      id: new_id,
    });
  });
});

app.post("/delete", (request, response) => {
  const fs = require("fs");
  fs.readFile("./question-data.json", "utf-8", function (err, data) {
    if (err) {
      return response.status(500).send({
        message: "Error reading JSON data",
        err,
      });
    }

    //convert JSON string into JavaScript object
    const questions = JSON.parse(data);

    const updatedTaskList = questions.filter(
      (question) => question.id !== request.body.id,
    );

    //overwrite entire file with new JSON content
    const json = JSON.stringify(updatedTaskList, null, 2);
    fs.writeFile("./question-data.json", json, "utf8", function (err, data) {
      if (err) {
        return response.status(500).send({
          message: "Error writing JSON data",
          err,
        });
      }
    });

    //If success, send success status
    return response.status(200).send({
      message: "Successfully deleted requested question",
    });
  });
});

module.exports = app;
