import React, { FormEvent, useEffect, useState } from "react";
import { FormEditContent } from "../Form";
import { QuestionType, QuestionData } from "../../types";
import axios from "axios";

interface Props {
  questionId: string;
  // KOYL: React philosophy...
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
  questionData: QuestionData;
  setQuestionData: React.Dispatch<React.SetStateAction<QuestionData>>;
  updateExtensionId: (newExtensionId: string) => void;
  deleteNode: () => void;
}

export const FormEdit = ({
  questionId,
  setQuestionId,
  questionData,
  setQuestionData,
  updateExtensionId,
  deleteNode,
}: Props) => {
  const [displayData, setDisplayData] = useState(questionData);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setDisplayData(questionData);
  }, [questionData]);

  //restore display data to prior all changes
  const handleCancel = () => {
    setDisplayData(questionData);
    setSelected(false);
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
      // KOYL: shouldn't be accessing the DOM anyways, but since you are, then you should be using classes and not ids
      const submitWarning = document.getElementById(
        questionId + "-submit-warning",
      );
      submitWarning!.innerText = "Please choose a solution";
      submitWarning!.classList.remove("hidden");
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
      document.getElementById(questionId + "-submit-warning")!.innerText =
        "Failed to store question in database";
      document
        .getElementById(questionId + "-submit-warning")!
        .classList.remove("hidden");
      document
        .getElementById(questionId + "-submit-warning")!
        .classList.add("show");
      return;
    }

    //if success change edit mode to unselected and update
    setQuestionData(newQuestionData.data);

    //if new question, assign valid id returned from API response
    if (questionId === "empty") {
      setQuestionId("question-" + res.data.id);
      updateExtensionId(res.data.id); //update the extension id to newly created id if created new question
    }

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
      document.getElementById(questionId + "-submit-warning")!.innerText =
        "Failed to delete question";
      document
        .getElementById(questionId + "-submit-warning")!
        .classList.remove("hidden");
      document
        .getElementById(questionId + "-submit-warning")!
        .classList.add("show");
      return;
    }

    //remove node view from editor content
    deleteNode();
  };

  //generic function for checking if two variables are the same
  //Credit: https://stackoverflow.com/questions/37930303/comparing-two-objects-to-see-if-equal
  // KOYL: I'm confused as to why you need this function
  const deepEqual = (a: any, b: any) => {
    //check if a and b are referring to the same thing
    if (a === b) {
      return true;
    }

    if (
      a == null ||
      typeof a != "object" ||
      b == null ||
      typeof b != "object"
    ) {
      return false;
    }

    //count the number of properties in a
    var propsInA = 0,
      propsInB = 0;

    for (var prop in a) {
      propsInA += 1;
    }

    for (var prop in b) {
      propsInB += 1;
      if (!(prop in a) || !deepEqual(a[prop], b[prop])) return false;
    }

    return propsInA === propsInB;
  };

  //check if there as been no changes made
  // KOYL: this doesn't have to be a function
  const isSame = () => {
    return (
      questionData.question === displayData.question &&
      questionData.solutionId === displayData.solutionId &&
      deepEqual(questionData.responses, displayData.responses)
    );
  };

  return (
    <div className="mcq-form hover-editable">
      <FormEditContent
        questionId={questionId}
        questionData={displayData}
        setQuestionData={setDisplayData}
        selected={selected}
        setSelected={setSelected}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
      {!isSame() ? <p className="warning">Unsaved changes</p> : <></>}
    </div>
  );
};
