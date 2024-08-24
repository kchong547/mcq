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
    selectedStatus: boolean;
    updateSelected: (status : boolean) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    handleCancel: () => void;
    handleDelete: (id: string) => Promise<void>;
  }
  
  export const FormEditContent = ({
    questionId,
    questionData,
    setQuestionData,
    selectedStatus,
    updateSelected,
    handleSubmit,
    handleCancel,
    handleDelete,
  }: Props) => {

    const handleSelect = () => {
      updateSelected(true);
    }

    return (
      <div onClick={(e)=>{e.stopPropagation(); handleSelect()}}>
      {selectedStatus ? (
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
                  onClick={(e)=>{e.stopPropagation(); handleCancel();}}
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