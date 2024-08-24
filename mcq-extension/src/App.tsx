import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { ModeToggleBtns } from "./Components/ModeToggleBtns";
import MultipleChoiceExtension from "./MultipleChoiceExtension";
import axios from "axios";

/* CONSTANTS */
const INITAL_PAGE_CONTENT = '<p>Welcome to the Multiple Choice Question Extension demo. Type "mod+enter" in the text editor to get started</p>';

const App = () => {
  const [editable, setEditable] = useState(false);
  const [pageContent, setPageContent] = useState(INITAL_PAGE_CONTENT);
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
    getPageContent();
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
      setShowWarning(true);
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
      setShowWarning(true);
    }
  };

  const changeEditable = (status : boolean) => {
    setEditable(status);
  };

  const changePageContent = (content : string) => {
    setPageContent(content);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="web-app">
      <ModeToggleBtns
        editable={editable}
        editor={editor}
        updatePageContent={updatePageContent}
        changePageContent={changePageContent}
        changeEditable={changeEditable}
      />

      <EditorContent editor={editor} />
      {showWarning && (<p id="warning" className="red" >Failed to interact with database</p>)}
    </div>
  );
};

export default App;