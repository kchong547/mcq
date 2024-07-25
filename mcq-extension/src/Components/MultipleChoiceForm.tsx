import { NodeViewWrapper } from "@tiptap/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FormEdit, FormView } from "./Form";
import { QuestionData } from "../types";
import "../multipleChoiceStyles.css";

const defaultData: QuestionData = {
  question: "",
  responses: [
    {
      id: "0",
      content: "",
    },
  ],
  solutionId: "0",
};

// KOYL: { ...props } === props
// instead you could deconstruct the props e.g.
// export const MultipleChoiceForm = ({ editor, node, deleteNode, ...props }) => {
export const MultipleChoiceForm = ({ ...props }) => {
  const [editable, setEditable] = useState(props.editor.isEditable);
  const [questionId, setQuestionId] = useState("empty");
  const [questionData, setQuestionData] = useState(defaultData);

  //update editable state when editor changes state
  useEffect(() => {
    setEditable(props.editor.isEditable);
  }, [props.editor.isEditable]);

  //get question data from database
  useEffect(() => {
    getQuestion();
  }, []);

  //update id attribute in extension to reflect changes in editor content
  const updateExtensionId = (newExtensionId: string) => {
    props.updateAttributes({
      id: newExtensionId,
    });
  };

  const getQuestion = async () => {
    try {
      const id_string = "question-" + props.node.attrs.id.toString();
      const configuration = {
        method: "GET",
        url: "http://localhost:8080/questions",
        params: {
          id: id_string,
        },
      };

      const res = await axios(configuration);

      //Could not find question in database
      if (res.status !== 200) {
        return;
      }

      const newQuestionData: QuestionData = {
        question: res.data.questionData.data.question,
        responses: res.data.questionData.data.responses,
        solutionId: res.data.questionData.data.solutionId,
      };

      setQuestionId(res.data.questionData.id);
      setQuestionData(newQuestionData);
      return;
    } catch (error) {
      //if error, use default values
      return;
    }
  };

  return (
    <NodeViewWrapper className="mcq-form-wrapper react-component">
      {editable ? (
        <FormEdit
          questionId={questionId}
          setQuestionId={setQuestionId}
          questionData={questionData}
          setQuestionData={setQuestionData}
          updateExtensionId={updateExtensionId}
          deleteNode={props.deleteNode} //from props https://github.com/ueberdosis/tiptap/discussions/1317
        />
      ) : (
        <FormView questionId={questionId} questionData={questionData} />
      )}
    </NodeViewWrapper>
  );
};
