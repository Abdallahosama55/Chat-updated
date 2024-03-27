import { EditorContent } from "@tiptap/react";
import { Stack } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ReformulateEditor = ({ editor, noGenerate }) => {
  //Reformulated Data
  const { data } = useSelector((state) => state.api?.rephrasePost);

  //Put Reformulate "rephrased_text" data to Left Editor
  if (noGenerate) {
    useEffect(() => {
      if (data?.rephrased_text) {
        editor.commands.setContent(data?.rephrased_text);
      }
    }, [editor, data?.rephrased_text]);
  }
  //Put Reformulate "original_text" data to Left Editor
  if (!noGenerate) {
    useEffect(() => {
      if (data?.original_text) {
        editor.commands.setContent(data?.original_text);
      }
    }, [editor, data?.original_text]);
  }

  return (
    <>
      <div dir="rtl">
        <EditorContent
          editor={editor}
          onClick={() => editor.commands.focus()}
        />
      </div>
      {noGenerate
        ? null
        : !editor.getText() && (
            <Stack
              className="place-holder custom-placeHolder position-absolute text-text-gray "
              onClick={() => editor.commands.focus()}>
              يُرجى تقديم النص الذي ترغب في صياغته، وسأكون سعيدًا بمساعدتك في
              ذلك
            </Stack>
          )}{" "}
    </>
  );
};

export default ReformulateEditor;
