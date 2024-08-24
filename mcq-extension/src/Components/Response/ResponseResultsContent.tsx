interface Props {
    questionId: string;
    responseId: string;
    content: string;
    explanation: string | undefined;
    mode: "answer" | "incorrect" | "notSelected";
}

export const ResponseResultsContent = ({
    questionId,
    responseId,
    content,
    explanation,
    mode,
  }: Props) => {
    return (
      <div className="response-group">
          <label className={mode === "answer" ? "green" : (mode === "incorrect" ? "warning" : "")} htmlFor={questionId + "-" + responseId}>
            {content}
          </label>

          <br />

          {explanation !== undefined && mode !== "notSelected" ? (
            <p className={"explanation".concat(mode==="answer"? " green" : " warning")}>{explanation}</p>
          ) : (
            <></>
          )}
      </div>
  );
}