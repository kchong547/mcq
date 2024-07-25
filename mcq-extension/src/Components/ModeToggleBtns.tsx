import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor | null; // KOYL: editor will never be null based on how you're using it
  updatePageContent: () => Promise<void>;
  // KOYL: React philosophy: we shouldn't be passing in setState to child components
  setPageContent: React.Dispatch<React.SetStateAction<string>>;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeEditable: (b: boolean) => void;
  onChangePageContent: (s: string) => void;
}

export const ModeToggleBtns = ({
  editor,
  updatePageContent,
  setPageContent,
  setEditable,
  onChangePageContent,
  onChangeEditable,
}: Props) => {
  const handleToggle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    editable: boolean,
  ) => {
    if (!editor) {
      return;
    }

    //only save page content when swapping out of editMode
    try {
      if (e.currentTarget.getAttribute("id") === "viewMode") {
        // KOYL: checked if !editor twice
        if (!editor) {
          return;
        }

        updatePageContent();
        setPageContent(editor.getHTML());
        onChangePageContent(editor.getHTML());
      }

      //style buttons so that current mode is distinguishable
      if (editable) {
        // KOYL: should be using React state
        document.getElementById("editMode")?.classList.add("active-btn");
        document.getElementById("viewMode")?.classList.remove("active-btn");
      } else {
        document.getElementById("viewMode")?.classList.add("active-btn");
        document.getElementById("editMode")?.classList.remove("active-btn");
      }

      setEditable(editable);
      onChangeEditable(editable);
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
        className="btn tgl-btn"
        // KOYL: /nit, handleToggle('editMode') vs handleToggle('viewMode') is a bit more legible
        onClick={(e) => handleToggle(e, true)}
      >
        Editor Mode
      </button>
      <button
        id="viewMode"
        aria-label="view-tgl-btn"
        className="btn tgl-btn active-btn"
        onClick={(e) => handleToggle(e, false)}
      >
        View Mode
      </button>
    </div>
  );
};
