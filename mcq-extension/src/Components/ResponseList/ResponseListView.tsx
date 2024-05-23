import React from "react";
import { ResponseView, ResponseResults } from "../Response";
import { ResponseType } from "../../types";

interface Props {
  questionId: string;
  responses: ResponseType[];
  mode: "view" | "editView" | "results";
  solutionId?: string;
  selectedId?: string;
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>;
}

export const ResponseListView = ({
  questionId,
  responses,
  mode,
  solutionId,
  selectedId,
  setSelectedId,
}: Props) => {
  //Generate the right response list based on given props and mode
  const generateList = (
    questionId: string,
    responses: ResponseType[],
    mode: "view" | "editView" | "results",
    solutionId?: string,
    selectedId?: string,
    setSelectedId?: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (mode === "view") {
      if (!setSelectedId) {
        return (
          <p className="warning">
            Missing setSelectedId for response list view
          </p>
        );
      }

      return responses.map((response: ResponseType) => (
        <ResponseView
          questionId={questionId}
          responseId={response.id}
          content={response.content}
          setSelectedId={setSelectedId}
          mode="view"
          key={questionId + "-" + response.id}
        />
      ));
    } else if (mode === "editView") {
      if (!solutionId) {
        return (
          <p className="warning">Missing solution id for response list edit</p>
        );
      }

      return responses.map((response: ResponseType) => (
        <ResponseView
          questionId={questionId}
          responseId={response.id}
          content={response.content}
          solutionId={solutionId}
          mode="edit"
          key={questionId + "-" + response.id}
        />
      ));
    } else {
      if (!selectedId || !solutionId) {
        return (
          <p className="warning">
            Missing selected id and/or solution id for response list view
          </p>
        );
      }

      return responses.map((response: ResponseType) => (
        <ResponseResults
          questionId={questionId}
          responseId={response.id}
          content={response.content}
          explanation={response.explanation}
          selectedResponseId={selectedId!}
          solutionId={solutionId!}
          key={questionId + "-" + response.id}
        />
      ));
    }
  };
  return (
    <div className="response-list">
      {generateList(
        questionId,
        responses,
        mode,
        solutionId,
        selectedId,
        setSelectedId,
      )}
    </div>
  );
};