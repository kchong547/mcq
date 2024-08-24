import { ResponseResultsContent } from "./";

interface Props {
  questionId: string;
  responseId: string;
  content: string;
  explanation: string | undefined;
  selectedResponseId: string;
  solutionId: string;
}

export const ResponseResults = ({
  questionId,
  responseId,
  content,
  explanation,
  selectedResponseId,
  solutionId,
}: Props) => {
  const mode = (responseId === solutionId ? "answer" :  (responseId === selectedResponseId ? "incorrect" : "notSelected"));
  
  //check if current response was selected
  const checkSelected = (id: string, selectedResponseId: string) => {
    return id === selectedResponseId;
  };

  return (
    <div className="response-group-wrapper">
      <input
        disabled
        key={questionId + "-" + responseId}
        type="radio"
        id={questionId + "-" + responseId}
        name={questionId}
        defaultChecked={checkSelected(responseId, selectedResponseId)}
      />
      <ResponseResultsContent 
        questionId={questionId}
        responseId={responseId}
        content={content}
        explanation={explanation}
        mode={mode}
      />
    </div>
  );
};
