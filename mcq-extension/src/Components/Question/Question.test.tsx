import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { QuestionType, QuestionData } from "../../types";
import { Question } from ".";

const sampleResponses = [
    {
        id: "0",
        content: "This is sample response 1",
        explanation: "Here's why this ISN'T the solution",
    }
]

const sampleQuestionData: QuestionData = {
    question: "sample question",
    responses: sampleResponses,
    solutionId: "3"
}

describe("Question with valid input in view mode", () => {
    const viewProps = {
        questionId: "1",
        questionData: sampleQuestionData,
        setQuestionData: jest.fn(),
        mode: "view" as "view"
    };

    it("renders question in view mode correctly", () => {
        render(<Question {...viewProps} />)

        const questionElem = screen.getByText("sample question");
        expect(questionElem).toBeInTheDocument();
    });
});

describe("Question with valid input in edit mode", () => {
    const editProps = {
        questionId: "1",
        questionData: sampleQuestionData,
        setQuestionData: jest.fn(),
        mode: "edit" as "edit"
    };

    const invalidProps = {
        questionData: sampleQuestionData,
        mode: "edit" as "edit"
    }

    it("renders question in edit mode correctly", () => {
        render(<Question {...editProps} />)

        const questionInput = screen.getByRole('textbox', {name: "question"});
        expect(questionInput).toBeInTheDocument();
    });

    it("calls updateQuestion in edit mode when question is updated", async () => {
        const user = userEvent.setup();
        render(<Question {...editProps} />)

        const questionInput = screen.getByRole('textbox', {name: "question"});

        act(() => {
            user.click(questionInput);
            user.type(questionInput, ' updated');
        });

        await waitFor(() => {
            expect(editProps.setQuestionData).toHaveBeenCalled();
        });
    })

    it("renders warning in edit mode correctly", () => {
        render(<Question {...invalidProps} />)

        const warningElem = screen.getByText("Missing arguments for QuestionEdit");
        expect(warningElem).toBeInTheDocument;
    });
});
