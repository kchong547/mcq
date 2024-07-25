import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { ModeToggleBtns } from "./Components";
import MultipleChoiceExtension from "./MultipleChoiceExtension";
import axios from "axios";

const App = () => {
  const [editable, setEditable] = useState(false);
  const [pageContent, setPageContent] = useState(
    // KOYL: separate large string into const
    // const INITIAL_PAGE_CONTENT = '<p>Welcome to the Multiple Choice Question Extension demo. Type "mod+enter" in the text editor to get started</p>',
    '<p>Welcome to the Multiple Choice Question Extension demo. Type "mod+enter" in the text editor to get started</p>',
  );

  const [showWarning, setShowWarning] = useState(false);

  const editor = useEditor(
    {
      editable,
      content: pageContent,
      extensions: [StarterKit, MultipleChoiceExtension],
    },
    [editable, pageContent],
  );

  useEffect(() => {
    // KOYL: I don't think you need this setTimeout, it can just be getPageContent()
    setTimeout(() => {
      getPageContent();
    });
  }, [editor]);

  //API call to retrieve stored page data from database
  const getPageContent = async () => {
    try {
      if (!editor) {
        return;
      }

      const configuration = {
        method: "GET",
        url: "http://localhost:8080/pageContent",
      };

      const res = await axios(configuration);
      editor?.commands.setContent(res.data.pageContent);
      setPageContent(res.data.pageContent);
    } catch (error) {
      //use default pageContent value
      document.getElementById("warning")!.innerText =
        "Failed to retrieve page content from database";
    }
  };

  //API call to update edited page content to database
  const updatePageContent = async () => {
    if (!editor) {
      return;
    }

    const configuration = {
      method: "POST",
      url: "http://localhost:8080/pageContent",
      data: {
        pageContent: editor.getHTML(),
      },
    };

    const res = await axios(configuration);

    if (res.status !== 200) {
      // KOYL: React philosophy, we should do our best to not touch the DOM directly
      // You could achieve a similar effect using React state
      // document.getElementById("warning")!.innerText =
      //   "Failed to update page information to database";
      setShowWarning(true);
      return;
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="web-app">
      <ModeToggleBtns
        editor={editor}
        updatePageContent={updatePageContent}
        setPageContent={setPageContent}
        setEditable={setEditable}
        onChangePageContent={(content: string) => {
          setPageContent(content);
        }}
        onChangeEditable={(editable: boolean) => {
          setEditable(editable);
        }}
      />

      <EditorContent editor={editor} />
      {/* KOYL: Use React state */}
      {showWarning && (
        <p id="warning" className="red">
          Failed to update page information to database
        </p>
      )}
    </div>
  );
};

export default App;
