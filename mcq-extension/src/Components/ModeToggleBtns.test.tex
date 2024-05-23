import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { useRef } from "react";
import { useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

jest.mock("axios");

import { ModeToggleBtns } from ".";

describe("ModeToggleBtns", () => {
    const baseEditor = new Editor(
        {
          editable: false,
          content: '<p>Welcome to the Multiple Choice Question Extension demo. Type "mod+enter" in the text editor to get started</p>',
          extensions: [StarterKit],
        },
    );

    const baseProps = {
        editor: baseEditor,
        updatePageContent: jest.fn(),
        setPageContent: jest.fn(),
        setEditable: jest.fn()
    }

    beforeEach(() => render(<ModeToggleBtns {...baseProps}/>));

    it("renders edit button correctly", () => {
        const editTglBtnElem = screen.getByRole("button", {name: "edit-tgl-btn"});
        expect(editTglBtnElem).toBeInTheDocument();
        expect(editTglBtnElem.classList.contains("active-btn")).toBe(false);
    });

    it("renders view button correctly", () => {
        const viewTglBtnElem = screen.getByRole("button", {name: "view-tgl-btn"});
        expect(viewTglBtnElem).toBeInTheDocument();
        expect(viewTglBtnElem.classList.contains("active-btn")).toBe(true);
    });

    it("toggles from view mode to edit mode when view mode is clicked and back again", async () => { 
        const editTglBtnElem = screen.getByRole("button", {name: "edit-tgl-btn"});
        const viewTglBtnElem = screen.getByRole("button", {name: "view-tgl-btn"});
        const user = userEvent.setup();

        act(() => {
            user.click(editTglBtnElem);
        });

        await waitFor(() => {
            expect(viewTglBtnElem.classList.contains("active-btn")).toBe(false);
            expect(editTglBtnElem.classList.contains("active-btn")).toBe(true);
        });

        act(() => {
            user.click(viewTglBtnElem);
        });

        await waitFor(() => {
            expect(viewTglBtnElem.classList.contains("active-btn")).toBe(true);
            expect(editTglBtnElem.classList.contains("active-btn")).toBe(false);
        });

    });
});

describe("ModeToggleBtns with null editor", () => {
    const baseProps = {
        editor: null,
        updatePageContent: jest.fn(),
        setPageContent: jest.fn(),
        setEditable: jest.fn()
    }

    beforeEach(() => render(<ModeToggleBtns {...baseProps}/>));

    it("renders edit button correctly", () => {
        const editTglBtnElem = screen.getByRole("button", {name: "edit-tgl-btn"});
        expect(editTglBtnElem).toBeInTheDocument();
        expect(editTglBtnElem.classList.contains("active-btn")).toBe(false);
    });

    it("renders view button correctly", () => {
        const viewTglBtnElem = screen.getByRole("button", {name: "view-tgl-btn"});
        expect(viewTglBtnElem).toBeInTheDocument();
        expect(viewTglBtnElem.classList.contains("active-btn")).toBe(true);
    });

    it("toggles from view mode to edit mode when view mode is clicked", async () => { 
        const editTglBtnElem = screen.getByRole("button", {name: "edit-tgl-btn"});
        const viewTglBtnElem = screen.getByRole("button", {name: "view-tgl-btn"});
        const user = userEvent.setup();

        act(() => {
            user.click(editTglBtnElem);
        });

        await waitFor(() => {
            expect(viewTglBtnElem.classList.contains("active-btn")).toBe(true);
            expect(editTglBtnElem.classList.contains("active-btn")).toBe(false);
        });

    });
});


