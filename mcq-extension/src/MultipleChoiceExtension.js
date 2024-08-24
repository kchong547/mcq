import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { MultipleChoiceForm } from "./Components/MultipleChoiceForm";

export default Node.create({
  name: "multiChoiceForm",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      id: {
        default: "empty",
      },
      editable: {
        default: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "multi-choice-form",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["multi-choice-form", mergeAttributes(HTMLAttributes)];
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => {
        return this.editor
          .chain()
          .insertContentAt(this.editor.state.selection.head, {
            type: this.type.name,
          })
          .focus()
          .run();
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(MultipleChoiceForm);
  },
});
