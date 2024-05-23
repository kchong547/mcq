import React, {
    FormEvent,
    useEffect,
    useState,
    useRef,
    RefObject,
  } from "react";
  import { Question } from "../Question";
  import { ResponseListView, ResponseListEdit } from "../ResponseList";
  import { QuestionData } from "../../types";
  
  interface Props {
    questionId: string;
    questionData: QuestionData;
    setQuestionData: React.Dispatch<React.SetStateAction<QuestionData>>;
    selected: boolean;
    setSelected: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    handleCancel: () => void;
    handleDelete: (id: string) => Promise<void>;
  }
  
  export const FormEditContent = ({
    questionId,
    questionData,
    setQuestionData,
    selected,
    setSelected,
    handleSubmit,
    handleCancel,
    handleDelete,
  }: Props) => {
    const wrapperRef: RefObject<HTMLDivElement> | null = useRef(null);
    const [selectStatus, setSelectStatus] = useState(selected);
  
    useEffect(() => {
      setSelectStatus(selected);
    }, [selected]);
  
    //Hook that alerts clicks inside of the passed ref
    //Based off: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    useEffect(() => {
      if (wrapperRef === null) {
        return;
      }
  
      //Alert if clicked on inside/outside of element
      function handleClick(e: MouseEvent) {
        if (
          wrapperRef!.current &&
          !wrapperRef!.current.contains(e.target as Node)
        ) {
          //detect click outside component while FormEditSelected
          setSelected(false);
        } else if (
          wrapperRef!.current &&
          wrapperRef!.current.contains(e.target as Node)
        ) {
          //detect click inside component while FormEditNotSelected
          setSelected(true);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", (e) => {
        handleClick(e);
      });
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", (e) => {
          handleClick(e);
        });
      };
    }, [wrapperRef]);
  
    return (
      <div ref={wrapperRef}>
        {selectStatus ? (
          <>
            <form id={questionId} onSubmit={handleSubmit}>
              <Question
                questionId={questionId}
                questionData={questionData}
                setQuestionData={setQuestionData}
                mode="edit"
              />
              <ResponseListEdit
                questionId={questionId}
                questionData={questionData}
                setQuestionData={setQuestionData}
              />
  
              <div className="btn-group">
                <div className="btn-right">
                  <button
                    type="button"
                    aria-label="cancel-btn"
                    className="tgl-btn btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    aria-label="save-btn"
                    className="tgl-btn btn"
                    >
                    Save
                  </button>
                </div>
                <div className="btn-left">
                  <button
                    type="button"
                    aria-label="delete-btn"
                    className="tgl-btn btn btn-delete"
                    onClick={(e) => {
                      handleDelete(questionId);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
            <p id={questionId + "-submit-warning"} className="warning hidden"></p>
          </>
        ) : (
          <>
            <Question questionData={questionData} mode="view" />
            <ResponseListView
              questionId={questionId}
              responses={questionData.responses}
              mode="editView"
              solutionId={questionData.solutionId}
            />
          </>
        )}
      </div>
    );
  };