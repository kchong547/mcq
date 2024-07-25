import { QuestionData } from "../../types";

interface Props {
  questionId?: string;
  questionData: QuestionData;
  setQuestionData?: React.Dispatch<React.SetStateAction<QuestionData>>;
  mode: "view" | "edit";
}

interface PropsView {
  questionData: QuestionData;
}

interface PropsEdit {
  questionId: string;
  questionData: QuestionData;
  setQuestionData: React.Dispatch<React.SetStateAction<QuestionData>>;
}

//Component for viewing question
const QuestionView = ({ questionData }: PropsView) => {
  return (
    <h2 className="question">
      {questionData.question !== "" ? questionData.question : "Question"}
    </h2>
  );
};

//Component for editing question
const QuestionEdit = ({
  questionId,
  questionData,
  setQuestionData,
}: PropsEdit) => {
  const updateQuestion = (newQuestion: string) => {
    const newQuestionData = {
      ...questionData,
      question: newQuestion,
    };

    setQuestionData(newQuestionData);
  };

  return (
    // KOYL: You don't need the empty <></>
    <>
      <input
        className="text-box"
        id={questionId + "questionEditForm"}
        aria-label="question"
        type="text"
        name="question"
        autoComplete="off"
        placeholder="Enter question"
        value={questionData.question}
        onChange={(e) => updateQuestion(e.target.value)}
      />
    </>
  );
};

export const Question = ({
  questionId,
  questionData,
  setQuestionData,
  mode,
}: Props) => {
  if (mode === "edit" && (!questionId || !setQuestionData)) {
    return <p className="warning">Missing arguments for QuestionEdit</p>;
  }

  return (
    <div className="question">
      {mode === "view" ? (
        <QuestionView questionData={questionData} />
      ) : (
        <QuestionEdit
          questionId={questionId!}
          questionData={questionData}
          setQuestionData={setQuestionData!}
        />
      )}
    </div>
  );
};
