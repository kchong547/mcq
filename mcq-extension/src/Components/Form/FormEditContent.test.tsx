import { render, screen, waitFor } from "@testing-library/react";
import { Question } from "../../types";

jest.mock("axios");

import { FormEditContent } from "../Form";

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

describe("FormEditContent not selected", () => {
    const notSelectedProps = {
        questionId: sample.id,
        questionData: sample.data,
        setQuestionData: jest.fn(),
        selected: false,
        setSelected: jest.fn(),
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        handleDelete: jest.fn()
    };

    beforeEach(() => render(<FormEditContent {...notSelectedProps} />));
    
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

describe("FormEditContent selected", () => {
    const selectedProps = {
        questionId: sample.id,
        questionData: sample.data,
        setQuestionData: jest.fn(),
        selected: true,
        setSelected: jest.fn(),
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        handleDelete: jest.fn()
    };

    beforeEach(() => render(<FormEditContent {...selectedProps} />));
    
    it("renders question textbox from prop correctly", () => {
      const questionInput = screen.getByRole('textbox', {name: "question"});
      expect(questionInput).toBeInTheDocument();
    });

    it("renders response textboxes from prop correctly", () => {
        const response0Input = screen.getByRole('textbox', {name: "question-0-response-0"});
        expect(response0Input).toBeInTheDocument();

        const response1Input = screen.getByRole('textbox', {name: "question-0-response-1"});
        expect(response1Input).toBeInTheDocument();

        const response2Input = screen.getByRole('textbox', {name: "question-0-response-2"});
        expect(response2Input).toBeInTheDocument();

        const response3Input = screen.getByRole('textbox', {name: "question-0-response-3"});
        expect(response3Input).toBeInTheDocument();

    });

    it("renders explanation textboxes from prop correctly", () => {
        const explanation0Input = screen.getByRole('textbox', {name: "question-0-explanation-0"});
        expect(explanation0Input).toBeInTheDocument();

        const explanation1Input = screen.getByRole('textbox', {name: "question-0-explanation-1"});
        expect(explanation1Input).toBeInTheDocument();

        const explanation2Input = screen.getByRole('textbox', {name: "question-0-explanation-2"});
        expect(explanation2Input).toBeInTheDocument();

        const explanation3Input = screen.getByRole('textbox', {name: "question-0-explanation-3"});
        expect(explanation3Input).toBeInTheDocument();
    })

    it("renders cancel button correctly", () => {
        const cancelBtnElem = screen.getByRole("button", {name: "cancel-btn"});
        expect(cancelBtnElem).toBeInTheDocument();
    });

    it("renders save button correctly", () => {
        const cancelBtnElem = screen.getByRole("button", {name: "save-btn"});
        expect(cancelBtnElem).toBeInTheDocument();
    });

    it("renders delete button correcty", () => {
        const cancelBtnElem = screen.getByRole("button", {name: "delete-btn"});
        expect(cancelBtnElem).toBeInTheDocument();
    })

    it("renders response delete buttons correcty", () => {
        const responseDeleteBtnGroup = screen.getAllByRole("button", {name: "response-delete-btn"});
        expect(responseDeleteBtnGroup).toHaveLength(4);
    })

});