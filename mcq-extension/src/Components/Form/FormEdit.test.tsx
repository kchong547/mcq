import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Question } from "../../types";

jest.mock("axios");

import { FormEdit } from "../Form";

const sample: Question = {
    id: "question-0",
    data: {
      question: "This is sample question 0",
      responses: [
        {
          id: "0",
          content: "This is sample response 1",
          explanation: "Here's why this ISN'T the solution",
        },
        {
          id: "1",
          content: "This is sample response 2",
          explanation: "Here's why this IS the solution",
        },
        {
          id: "2",
          content: "This is sample response 3",
          explanation: "Here's why this ISN'T the solution",
        },
        {
          id: "3",
          content: "This is sample response 4",
          explanation: "Here's why this ISN'T the solution",
        },
      ],
      solutionId: "1",
    },
  };

  const baseProps = {
    questionId: sample.id,
    setQuestionId: jest.fn(), //fake function
    questionData: sample.data,
    setQuestionData: jest.fn(),
    updateExtensionId: jest.fn(),
    deleteNode: jest.fn()
  }

  describe("FormEdit", () => {
    beforeEach(() => render(<FormEdit {...baseProps} />));

    it("renders question from prop correctly", () => {
      const h2Elem = screen.getByRole("heading", {
        level: 2,
      });
      expect(h2Elem).toBeInTheDocument();
  
      const questionElem = screen.getByText("This is sample question 0");
      expect(questionElem).toBeInTheDocument();
    });

    it("renders response list of input and labels correctly", () => {
        const input0Elem = screen.getByLabelText("This is sample response 1", {
          selector: "input",
        });
        expect(input0Elem).toBeInTheDocument();
    
        const input1Elem = screen.getByLabelText("This is sample response 2", {
          selector: "input",
        });
        expect(input1Elem).toBeInTheDocument();
    
        const input2Elem = screen.getByLabelText("This is sample response 3", {
          selector: "input",
        });
        expect(input2Elem).toBeInTheDocument();
    
        const input3Elem = screen.getByLabelText("This is sample response 4", {
          selector: "input",
        });
        expect(input3Elem).toBeInTheDocument();
      });
});