import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { ResponseType } from "../../types";
import { ResponseEdit } from ".";

describe("ResponseEdit with valid input in view mode", () => {
    const sampleResponse: ResponseType = {
        id: "2",
        content: "sample response",
        explanation: "sample explanation"
    };
    
    const baseProps = {
        numResponses: 2,
        questionId: "question-1",
        responseData: sampleResponse,
        solutionId: "0",
        updateResponses: jest.fn(),
        deleteResponse: jest.fn(),
        updateSolutionId: jest.fn()
    };

    it("renders response correctly in view mode with valid input", () => {
        render(<ResponseEdit {...baseProps} />);

        const response1Label = screen.getByRole('textbox', {name: "question-1-response-2"});
        expect(response1Label).toBeInTheDocument();

        const input1Radio = screen.getByRole('radio', {name: "question-1-response-2"});
        expect(input1Radio).toBeInTheDocument();

        const responseDeleteBtn = screen.getByRole("button", {name: "response-delete-btn"});
        expect(responseDeleteBtn).toBeInTheDocument();

        const explanation1Input = screen.getByRole('textbox', {name: "question-1-explanation-2"});
        expect(explanation1Input).toBeInTheDocument();
    });

    it("correctly calls updateSelectedId when input radio is clicked", async () => {
        const user = userEvent.setup();
        render(<ResponseEdit {...baseProps} />);

        const input1Radio = screen.getByRole('radio', {name: "question-1-response-2"});

        act(() => {
            user.click(input1Radio);
        });

        await waitFor(() => {
            expect(baseProps.updateSolutionId).toHaveBeenCalled();
        });
    })

    it("correctly calls deleteResponse when response delete button is clicked", async () => {
        const user = userEvent.setup();
        render(<ResponseEdit {...baseProps} />);

        const responseDeleteBtn = screen.getByRole("button", {name: "response-delete-btn"});

        act(() => {
            user.click(responseDeleteBtn);
        });

        await waitFor(() => {
            expect(baseProps.deleteResponse).toHaveBeenCalled();
        });
    })

    it("correctly calls updateResponse and setResponse when user types in response input", async () => {
        const user = userEvent.setup();
        render(<ResponseEdit {...baseProps} />);

        const response1Label = screen.getByRole('textbox', {name: "question-1-response-2"});

        act(() => {
            user.click(response1Label);
            user.type(response1Label, ' updated');
        });

        await waitFor(() => {
            expect(baseProps.updateResponses).toHaveBeenCalled();
            expect(screen.getByDisplayValue('sample response updated')).toBeInTheDocument();

        });
    })

    it("correctly calls updateResponse and setExplanation when user types in explanation input", async () => {
        const user = userEvent.setup();
        render(<ResponseEdit {...baseProps} />);

        const explanation1Input = screen.getByRole('textbox', {name: "question-1-explanation-2"});

        act(() => {
            user.click(explanation1Input);
            user.type(explanation1Input, ' updated');
        });

        await waitFor(() => {
            expect(baseProps.updateResponses).toHaveBeenCalled();
            expect(screen.getByDisplayValue('sample explanation updated')).toBeInTheDocument();

        });
    })

});

