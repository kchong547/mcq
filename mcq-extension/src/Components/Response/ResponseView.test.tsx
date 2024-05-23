import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { ResponseView } from ".";

describe("ResponseView with valid input in view mode", () => {
    const baseProps = {
        questionId: "question-4",
        responseId: "1",
        content: "sample response 1",
        setSelectedId: jest.fn(),
        mode: "view" as "view"
    };

    it("renders response correctly in view mode with valid input", () => {
        render(<ResponseView {...baseProps} />);

        const input1Elem = screen.getByLabelText("sample response 1", {
            selector: "input",
        });
        expect(input1Elem).toBeInTheDocument();

        const input1Radio = screen.getByRole('radio', {name: "question-4-response-1"});
        expect(input1Radio).toBeInTheDocument();
    });
});

describe("ResponseView with missing setSelectedId in view mode", () => {
    const baseProps = {
        questionId: "question-4",
        responseId: "1",
        content: "sample response",
        mode: "view" as "view"
    }

    it("renders warning correctly in view mode with invalid input", () => {
        render(<ResponseView {...baseProps} />);

        const warningElem = screen.getByText("Invalid arguments for response view");
        expect(warningElem).toBeInTheDocument;
    });
});


describe("ResponseView with valid input in edit mode", () => {
    const baseProps = {
        questionId: "question-4",
        responseId: "1",
        content: "sample response 1",
        solutionId: "0",
        mode: "edit" as "edit"
    }
    it("renders response correctly in edit mode", () => {
        render(<ResponseView {...baseProps} />);

        const input1Elem = screen.getByLabelText("sample response 1", {
            selector: "input",
        });
        expect(input1Elem).toBeInTheDocument();

        const input1Radio = screen.getByRole('radio', {name: "question-4-response-1"});
        expect(input1Radio).toBeInTheDocument();
    });
});

describe("ResponseView with missing solutionId in edit mode", () => {
    const baseProps = {
        questionId: "question-4",
        responseId: "1",
        content: "sample response",
        mode: "edit" as "edit"
    }

    it("renders warning correctly in edit mode with invalid input", () => {
        render(<ResponseView {...baseProps} />);

        const warningElem = screen.getByText("Invalid arguments for response edit view only");
        expect(warningElem).toBeInTheDocument;
    });
});

describe("user clicks input radio in response view mode", () => {
    const baseProps = {
        questionId: "question-4",
        responseId: "1",
        content: "sample response 1",
        setSelectedId: jest.fn(),
        mode: "view" as "view"
    };

    it("correctly calls setSelectedId when response is clicked in view mode", async () => {
        const user = userEvent.setup();
        render(<ResponseView {...baseProps} />);
        const input1Radio = screen.getByRole('radio', {name: "question-4-response-1"});
        
        act(() => {
            user.click(input1Radio);
        });

        await waitFor(() => {
            expect(baseProps.setSelectedId).toHaveBeenCalled();
        });
    });
});

