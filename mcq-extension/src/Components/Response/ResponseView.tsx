interface Props {
    questionId: string;
    responseId: string;
    content: string;
    solutionId?: string;
    setSelectedId?: React.Dispatch<React.SetStateAction<string>>;
    mode: "edit" | "view";
  }
  
  export const ResponseView = ({
    questionId,
    responseId,
    content,
    solutionId,
    setSelectedId,
    mode,
  }: Props) => {
    if (mode === "edit" && !solutionId) {
      return (
        <p className="warning">Invalid arguments for response edit view only</p>
      );
    }
  
    if (mode === "view" && !setSelectedId) {
      return <p className="warning">Invalid arguments for response view</p>;
    }
  
    return (
      <div className="response-group-wrapper">
        {mode === "view" ? (
          <input
            type="radio"
            id={questionId + "-" + responseId}
            name={questionId}
            onChange={(e) => {
              setSelectedId!(responseId);
            }}
          />
        ) : (
          <input
            disabled
            type="radio"
            id={questionId + "-" + responseId}
            name={questionId + "-"}
            checked={responseId === solutionId!}
            className="hover-editable"
          />
        )}
        <div className="response-group">
          <label htmlFor={questionId + "-" + responseId}>{content}</label>
        </div>
        <br />
      </div>
    );
  };