import { useEffect, useState } from "react";
import { ResponseType } from "../../types";

interface Props {
  numResponses: number;
  questionId: string;
  responseData: ResponseType;
  solutionId: string;
  updateResponses: (
    id: string,
    responseContent: string,
    info: "content" | "explanation",
  ) => void;
  deleteResponse: (id: string) => void;
  updateSolutionId: (id: string) => void;
}

export const ResponseEdit = ({
  numResponses,
  questionId,
  responseData,
  solutionId,
  updateResponses,
  deleteResponse,
  updateSolutionId,
}: Props) => {
  const [response, setResponse] = useState(responseData.content);
  const [explanation, setExplanation] = useState(responseData.explanation);

  useEffect(() => {
    setResponse(responseData.content);
    setExplanation(responseData.explanation);
  }, [responseData]);

  return (
    <>
      <div className="response-group-wrapper">
        <input
          type="radio"
          id={questionId + "-" + responseData.id}
          name={questionId}
          aria-label={questionId + "-response-" + responseData.id}
          checked={responseData.id === solutionId}
          autoComplete="off"
          onChange={(e) => {
            e.stopPropagation();
            updateSolutionId(responseData.id);
          }}
        />
        <div className="response-group">
          <label htmlFor={questionId + "-response-" + responseData.id}>
            <div className="btn-delete-pair">
              <input
                className="text-box"
                aria-label={questionId+"-response-"+responseData.id}
                type="text"
                name="response"
                autoComplete="off"
                placeholder="Enter option"
                value={response}
                onChange={(e) => {
                  setResponse(e.target.value);
                  updateResponses(responseData.id, e.target.value, "content");
                }}
              />

              {numResponses > 1 ? (
                <button
                  type="button"
                  aria-label="response-delete-btn"
                  className=" btn btn-delete btn-delete-small"
                  onClick={(e) => {
                    deleteResponse(responseData.id);
                  }}
                >
                  X
                </button>
              ) : (
                <></>
              )}
            </div>
            <input
              className="text-box explanation"
              aria-label={questionId+"-explanation-"+responseData.id}
              type="text"
              name="explanation"
              autoComplete="off"
              placeholder="Enter explanation"
              value={explanation === undefined ? "" : explanation}
              onChange={(e) => {
                setExplanation(e.target.value);
                updateResponses(responseData.id, e.target.value, "explanation");
              }}
            />
          </label>
        </div>
      </div>
    </>
  );
};