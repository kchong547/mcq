import React from "react";
import { ResponseEdit } from "../Response";
import { QuestionData, ResponseType } from "../../types";
import { nanoid } from "nanoid";

interface Props {
  questionId: string;
  questionData: QuestionData;
  setQuestionData: React.Dispatch<React.SetStateAction<QuestionData>>;
}

export const ResponseListEdit = ({
  questionId,
  questionData,
  setQuestionData,
}: Props) => {
  //update display response list with new content for response or explanation
  const handleUpdateResponseContent = (
    id: string,
    content: string,
    info: "content" | "explanation",
  ) => {
    const updatedResponses = questionData.responses.map((response) => {
      //if this task is the task that needs to have completed status inverted
      if (response.id === id) {
        if (info === "content") {
          return {
            ...response,
            content: content,
          };
        } else {
          return {
            ...response,
            explanation: content,
          };
        }
      } else {
        return response;
      }
    });

    const newQuestionData: QuestionData = {
      ...questionData,
      responses: updatedResponses,
    };

    setQuestionData(newQuestionData);
  };

  const handleCreateResponse = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const newResponse: ResponseType = {
      id: nanoid(), //randomly generate a responseID
      content: "",
    };

    const newQuestionData: QuestionData = {
      ...questionData,
      responses: [...questionData.responses, newResponse],
    };

    document.getElementById("add-response-textbox")?.blur(); //remove focus from add option text box
    setQuestionData(newQuestionData);
  };

  const handleDeleteResponse = (id: string) => {
    const remainingResponses = questionData.responses.filter(
      (response) => response.id !== id,
    );

    const newQuestionData: QuestionData = {
      ...questionData,
      responses: remainingResponses,
    };

    setQuestionData(newQuestionData);
  };

  const updateSolutionId = (newId: string) => {
    const newQuestionData: QuestionData = {
      ...questionData,
      solutionId: newId,
    };

    setQuestionData(newQuestionData);
  };

  //Create list of ResponseEdit components for each response
  const responseList = questionData.responses.map((response: ResponseType) => (
    <ResponseEdit
      numResponses={questionData.responses.length}
      questionId={questionId}
      responseData={response}
      solutionId={questionData.solutionId}
      updateResponses={handleUpdateResponseContent}
      deleteResponse={handleDeleteResponse}
      updateSolutionId={updateSolutionId}
      key={questionId + "-" + response.id}
    />
  ));

  return (
    <>
      {responseList}
      <div className="response-group-wrapper">
        <input type="radio" id="add-response" disabled />
        <div className="response-group">
          <label htmlFor="add-response">
            <input
              id="add-response-textbox"
              className="text-box"
              type="text"
              name="response"
              autoComplete="off"
              placeholder="Add option"
              onClick={(e) => handleCreateResponse(e)}
              readOnly
            />
          </label>
        </div>
      </div>
    </>
  );
};