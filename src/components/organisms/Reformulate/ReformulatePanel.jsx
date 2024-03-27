//ImportedModules
import { Stack } from "react-bootstrap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import { FontSize } from "@/helpers/tiptap-fontsize";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import Image from "@tiptap/extension-image";
import { useAppDispatch } from "@/redux/hooks";

// Imported Files
import {
  setContent,
  setText,
  updateDocument,
} from "@/redux/features/api/apiSlice";
import ReformulateToolbar from "./ReformulateToolbar";
import ReformulateEditor from "./ReformulateEditor";

const ReformulatePanel = ({ setEditorData, noGenerate }) => {
  //Responsive
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";

  const dispatch = useAppDispatch();
  //Editor
  const editor = useEditor({
    content: "",
    editable: true,
    //Change Editor content while writing
    onUpdate: ({ editor }) => {
      dispatch(setContent(editor.getHTML()));
      dispatch(updateDocument({ content: editor.getText(), isEditor: true }));
      dispatch(setText(editor.getText()));
    },
    extensions: [
      StarterKit,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "right",
      }),
      Link.configure({
        linkOnPaste: false,
        openOnClick: false,
      }),
      Typography,
      FontSize,
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Image.configure({
        inline: true,
      }),
    ],
  });

  if (editor === null) return null;

  if (setEditorData) {
    setEditorData(editor.getText());
  }
  return (
    <>
      <Stack
        className={`${isBelowDesktop ? "px-0" : " h-100 gap-3 "}`}
        gap={2}>
        <Stack
          className={`justify-content-center  ${
            !noGenerate ? "px-2" : "px-4"
          }  border-top w-100  `}
          direction="horizontal">
          <ReformulateToolbar
            editor={editor}
            noGenerate={noGenerate}
          />
        </Stack>
        <Stack
          className="flex-fill editor  editorCustom border-top fs-5 position-relative p-4"
          style={{
            minHeight: isBelowDesktop ? "55vh" : "",
            maxWidth: "700px",
          }}>
          <Stack>
            <ReformulateEditor
              noGenerate={noGenerate}
              editor={editor}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ReformulatePanel;
