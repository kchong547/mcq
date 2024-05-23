import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Question } from "../../types";

jest.mock("axios");

import { FormView } from "../Form";

const sample0: Question = {
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

describe("FormView", () => {
  beforeEach(() => render(<FormView questionId={sample0.id} questionData={sample0.data} />));

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

  it("renders submit button correctly", () => {
    const submitBtnElem = screen.getByRole("button");
    expect(submitBtnElem).toBeInTheDocument();
  });

  it("renders the warning message correctly", () => {
    const warningElem = screen.getByText("Please select an answer!");
    expect(warningElem.classList.contains("hidden")).toBe(true);
  });

  it("renders results after submit is clicked without selecting response", async () => {
    const user = userEvent.setup();
    const submitBtnElem = screen.getByRole("button");

    act(()=> {
      user.click(submitBtnElem);
    });
    
    await waitFor(() => {
      const warningElem = screen.getByText("Please select an answer!");
      expect(warningElem.classList.contains("show")).toBe(true);
    });
  });

  it("renders results after selecting incorrect response and submit button is clicked", async () => {
    const user = userEvent.setup();
    const submitBtnElem = screen.getByRole("button");
    const input2Elem = screen.getByLabelText("This is sample response 3", {
      selector: "input",
    });

    act(() => {
      user.click(input2Elem);
      user.click(submitBtnElem);
    });

    await waitFor(() => {
      const correctMsgElem = screen.getByText("Here's why this IS the solution");
      expect(correctMsgElem).toBeInTheDocument();
      expect(correctMsgElem.classList.contains("green")).toBe(true);

      const incorrectMsgElem = screen.getByText("Here's why this ISN'T the solution");
      expect(incorrectMsgElem).toBeInTheDocument();
      expect(incorrectMsgElem.classList.contains("warning")).toBe(true);
    });
  });

  it("renders results after selecting correct response and submit button is clicked", async () => {
    const user = userEvent.setup();
    const submitBtnElem = screen.getByRole("button");
    const input2Elem = screen.getByLabelText("This is sample response 2", {
      selector: "input",
    });

    act(() => {
      user.click(input2Elem);
      user.click(submitBtnElem);
    });

    await waitFor(() => {
      const correctMsgElem = screen.getByText("Here's why this IS the solution");
      expect(correctMsgElem).toBeInTheDocument();
      expect(correctMsgElem.classList.contains("green")).toBe(true);
    });
  });
});
