interface Props {
  questionId: string;
  responseId: string;
  content: string;
  explanation: string | undefined;
  selectedResponseId: string;
  solutionId: string;
}

interface FormatProps {
  questionId: string;
  responseId: string;
  content: string;
  explanation: string | undefined;
  mode: "answer" | "incorrect" | "notSelected";
}

const ResponseFormat = ({
  questionId,
  responseId,
  content,
  explanation,
  mode,
}: FormatProps) => {
  if (mode === "answer") {
    return (
      <div className="response-group">
        <label className="green" htmlFor={questionId + "-" + responseId}>
          {content}
        </label>

        <br />
        {explanation !== undefined ? (
          <p className="green explanation">{explanation}</p>
        ) : (
          <></>
        )}
      </div>
    );
  } else if (mode === "incorrect") {
    return (
      <div className="response-group">
        <label className="warning" htmlFor={questionId + "-" + responseId}>
          {content}
        </label>
        <br />
        {explanation !== undefined ? (
          <p className="warning explanation">{explanation}</p>
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return (
      <div className="response-group">
        <label className="" htmlFor={questionId + "-" + responseId}>
          {content}
        </label>
        <br />
      </div>
    );
  }
};

export const ResponseResults = ({
  questionId,
  responseId,
  content,
  explanation,
  selectedResponseId,
  solutionId,
}: Props) => {
  //check if current response was selected
  const checkSelected = (id: string, selectedResponseId: string) => {
    // KOYL: can be simplified
    // return id === selectedResponseId;
    return id === selectedResponseId ? true : false;
  };

  const getContentFormat = () => {
    //if current id is the answer regardless of selection
    // KOYL: this function is just changing this mode prop getting passed in
    // This is a bit DRY, can be refactored to
    // const mode = responseId === solutionId ? 'answer' : responseId === selectedResponseId ...
    // return (<ResponseFormat
    //   questionId={questionId}
    //   responseId={responseId}
    //   content={content}
    //   explanation={explanation}
    //   mode={mode}
    // />)
    // KOYL: even better, we can pass mode in as a parameter and handle the mode logic somewhere else
    if (responseId === solutionId) {
      return (
        <ResponseFormat
          questionId={questionId}
          responseId={responseId}
          content={content}
          explanation={explanation}
          mode="answer"
        />
      );
    }
    //if current id was selected but not the answer
    else if (responseId === selectedResponseId) {
      return (
        <ResponseFormat
          questionId={questionId}
          responseId={responseId}
          content={content}
          explanation={explanation}
          mode="incorrect"
        />
      );
    }
    //if current id was not selected
    else {
      return (
        <ResponseFormat
          questionId={questionId}
          responseId={responseId}
          content={content}
          explanation={explanation}
          mode="notSelected"
        />
      );
    }
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
      {getContentFormat()}
    </div>
  );
};
