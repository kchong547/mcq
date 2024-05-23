import { FormEvent, useState } from "react";
import { Question } from "../Question";
import { ResponseListView } from "../ResponseList";

import { QuestionData } from "../../types";
import axios from "axios";

interface Props {
  questionId: string;
  questionData: QuestionData;
}

export const FormView = ({ questionId, questionData }: Props) => {
  const [selectedId, setSelectedId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //send submission data to API
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      //check if selectedId is the solution
      if (selectedId === "") {
        const noAnswerMsg = document.getElementById(
          questionId + "-no-answer-msg",
        );
        noAnswerMsg!.classList.remove("hidden");
        noAnswerMsg!.classList.add("show");
        return;
      }

      const configuration = {
        method: "POST",
        url: "http://localhost:8000/record",
        data: {
          questionId: questionId,
          selectedId: selectedId,
          solutionId: questionData.solutionId,
          responseContent: questionData.responses,
          correct: questionData.solutionId === selectedId,
        },
      };
      const res = await axios(configuration);

      setSubmitted(true);
    } catch (error) {
      //dont do anything if failed to send request
      setSubmitted(true);
      return;
    }
    
  };

  return (
    <div className="mcq-form">
      <Question questionData={questionData} mode="view" />
      {submitted ? (
        <ResponseListView
          questionId={questionId}
          responses={questionData.responses}
          mode="results"
          solutionId={questionData.solutionId}
          selectedId={selectedId}
        />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <ResponseListView
              questionId={questionId}
              responses={questionData.responses}
              setSelectedId={setSelectedId}
              mode="view"
            />
            <button type="submit" className="btn inline-btn">
              Submit
            </button>
            <p id={questionId + "-no-answer-msg"} className="warning hidden">
              Please select an answer!
            </p>
          </form>
        </>
      )}
      <p id={questionId + "-submit-warning"} className="warning hidden"></p>
    </div>
  );
};