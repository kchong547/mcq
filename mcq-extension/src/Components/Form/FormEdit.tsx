import React, { FormEvent, useEffect, useState } from "react";
import { FormEditContent } from "./";
import { QuestionType, QuestionData } from "../../types";
import { deepEqual } from "../../Utils/utils"
import axios from "axios";

interface Props {
  questionId: string;
  updateQuestionId: (newId: string) => void;
  questionData: QuestionData;
  updateQuestionData: (newData: QuestionData) => void;
  updateExtensionId: (newExtensionId: string) => void;
  deleteNode: () => void;
  updateErrorMsg: (newMsg : string) => void;
}

export const FormEdit = ({
  questionId,
  updateQuestionId,
  questionData,
  updateQuestionData,
  updateExtensionId,
  deleteNode,
  updateErrorMsg,
}: Props) => {
  const [displayData, setDisplayData] = useState(questionData);
  const [selected, setSelected] = useState(false);
  const isSame = questionData.question === displayData.question && questionData.solutionId === displayData.solutionId && deepEqual(questionData.responses, displayData.responses);
  

  useEffect(() => {
    setDisplayData(questionData);
  }, [questionData]);

  //restore display data to prior all changes
  const handleCancel = () => {
    setDisplayData(questionData);
    setSelected(false);
    updateErrorMsg("");
  };

  //send new question data to database
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //check if data is valid
    //1. must have at least one option => accounted for in responseEdit which will only show delete button if there are more than 1 responses
    //2. must have valid solution selected  (below)
    const solution = displayData.responses.find(
      (response) => response.id === displayData.solutionId,
    );
    if (!solution) {

      updateErrorMsg("Please choose a solution");
      return;
    }

    //Create new questionData to update existing question
    const newQuestionData: QuestionType = {
      id: questionId,
      data: {
        question: displayData.question,
        responses: displayData.responses,
        solutionId: displayData.solutionId,
      },
    };

    const configuration = {
      method: "POST",
      url: "",
      data: {
        newQuestionData,
      },
    };

    //determine if question has or hasnt been added to database yet
    if (questionId === "empty") {
      configuration.url = "http://localhost:8080/create";
    } else {
      configuration.url = "http://localhost:8080/update";
    }

    const res = await axios(configuration);
    if (res.status !== 200) {
      updateErrorMsg("Failed to store question in database");
      return;
    }

    //if success change edit mode to unselected and update
    updateQuestionData(newQuestionData.data);

    //if new question, assign valid id returned from API response
    if (questionId === "empty") {
      updateQuestionId("question-" + res.data.id);
      updateExtensionId(res.data.id); //update the extension id to newly created id if created new question
    }

    updateErrorMsg("");
    setSelected(false);
  };

  const handleDelete = async (idDelete: string) => {
    const configuration = {
      method: "POST",
      url: "http://localhost:8080/delete",
      data: {
        id: idDelete,
      },
    };

    const res = await axios(configuration);

    if (res.status !== 200) {
      updateErrorMsg("Failed to delete question");
      return;
    }

    //remove node view from editor content
    deleteNode();
    setSelected(false);
  };

  const updateSelected = (status : boolean) => {
    setSelected(status);
  }

  return (
    <div className="mcq-form hover-editable">
      <FormEditContent
        questionId={questionId}
        questionData={displayData}
        setQuestionData={setDisplayData}
        selectedStatus={selected}
        updateSelected={updateSelected}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
      {!isSame ? <p className="warning">Unsaved changes</p> : <></>}
    </div>
  );
};