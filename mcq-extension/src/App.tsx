import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { ModeToggleBtns } from "./Components";
import MultipleChoiceExtension from "./MultipleChoiceExtension";
import axios from "axios";

const App = () => {
  const [editable, setEditable] = useState(false);
  const [pageContent, setPageContent] = useState(
    '<p>Welcome to the Multiple Choice Question Extension demo. Type "mod+enter" in the text editor to get started</p>',
  );

  const editor = useEditor(
    {
      editable,
      content: pageContent,
      extensions: [StarterKit, MultipleChoiceExtension],
    },
    [editable, pageContent],
  );

  useEffect(() => {
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
      document.getElementById("warning")!.innerText =
        "Failed to update page information to database";
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
      />

      <EditorContent editor={editor} />
      <p id="warning" className="red"></p>
    </div>
  );
};

export default App;