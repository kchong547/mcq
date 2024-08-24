import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface Props {
  editable: boolean;
  editor: Editor;
  updatePageContent: () => Promise<void>;
  changePageContent: (content: string) => void;
  changeEditable: (status: boolean) => void;
}

export const ModeToggleBtns = ({
  editable,
  editor,
  updatePageContent,
  changePageContent,
  changeEditable,
}: Props) => {
  const [activeBtn, setActiveBtn] = useState("viewMode");

  useEffect(() => {
    setActiveBtn(editable ? "editMode" : "viewMode");
  }, [editable]);

  const handleToggle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    editable: "editMode" | "viewMode",
  ) => {
    //only save page content when swapping out of editMode
    try {
      if (e.currentTarget.getAttribute("id") === "viewMode") {
        updatePageContent();
        changePageContent(editor.getHTML());
      }

      //notify parent of changed state between buttons
      changeEditable((editable === "editMode"));

    } catch (error) {
      document.getElementById("warning")!.innerText =
        "Failed to switch to editor/view mode";
    }
  };

  return (
    <div className="toggle-button">
      <button
        id="editMode"
        aria-label="edit-tgl-btn"
        className={"btn tgl-btn" + (activeBtn === "editMode" ? " active-btn" : "")}
        onClick={(e) => handleToggle(e, "editMode")}
      >
        Editor Mode
      </button>
      <button
        id="viewMode"
        aria-label="view-tgl-btn"
        className={"btn tgl-btn" + (activeBtn === "viewMode" ? " active-btn" : "")}
        onClick={(e) => handleToggle(e, "viewMode")}
      >
        View Mode
      </button>
    </div>
  );
};
