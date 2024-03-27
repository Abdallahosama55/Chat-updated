import { Card, Col, Stack } from "react-bootstrap";
import Toolbar from "@/components/molecules/Toolbar";
import { useEditor } from "@tiptap/react";
import CustomButton from "@/components/atoms/Button";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import { FontSize } from "@/helpers/tiptap-fontsize";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  checkMistakes,
  correctMistakes,
  setContent,
  setText,
} from "@/redux/features/api/apiSlice";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";

import CopyIcon from "@/assets/icons/Copy";
import DownloadIcon from "@/assets/icons/Download";
import ArrowIcon from "@/assets/icons/Arrow";
import { themeColors } from "@/Util/theme";
import CheckerEditor from "@/components/molecules/CheckerEditor";
import MultiOptionDropDown from "@/components/molecules/MultiOptionDropDown";
import { useEffect, useState } from "react";
import { exportToFile } from "@/helpers/exportToFile";

const RightPanel = () => {
  const dispatch = useAppDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const checker = useAppSelector((state) => state.checker);
  const editor = useEditor(
    {
      content: "",
      editable: true,
      onUpdate: ({ editor }) => {
        if (editor.timer) {
          clearTimeout(editor.timer);
        }

        editor.timer = setTimeout(() => {
          dispatch(setContent(editor.getHTML()));
          dispatch(setText(editor.getText()));
          dispatch(checkMistakes({ content: editor.getText() }));
        }, 1000);
      },
      extensions: [
        StarterKit,
        TextStyle,
        Placeholder.configure({
          placeholder: "/press / lol....",
        }),
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
        {
          name: "cursorColor",
          addGlobalClass: true,
          addCommand(t, cursorColor) {
            const styles = `
            .ProseMirror {
              cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect fill="${cursorColor}" width="16" height="1"/></svg>') 0 8, auto !important;
            }
          `;
            return t.css(styles);
          },
        },
        Highlight.configure({
          multicolor: true,
        }),
      ],
    },
    []
  );

  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    if (editor) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(checker.content, false, {
        preserveWhitespace: "full",
      });
      editor.commands.setTextSelection({ from, to });
    }
  }, [checker.content]);

  const objectErrors = checker.mistakes["Spelling Mistakes"];

  if (editor === null) return null;
  return (
    <>
      <Stack
        className={`${isBelowDesktop ? "px-0" : "px-3 h-100"}`}
        gap={4}>
        <Stack
          className="justify-content-center"
          direction="horizontal">
          <Toolbar editor={editor} />
        </Stack>
        <Stack
          className="flex-fill editor border rounded-3 fs-5 position-relative p-3"
          style={{
            minHeight: isBelowDesktop ? "75vh" : "",
          }}
          onClick={() => editor.commands.focus()}>
          <CheckerEditor editor={editor} />
        </Stack>
      </Stack>
      {isBelowDesktop && (
        <Col className="my-3">
          <Card className=" bg-light">
            <Stack
              direction={`${"horizontal"}`}
              gap={1}
              style={{
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}>
              <CustomButton
                onlyIcon
                onClick={() => {
                  navigator.clipboard.writeText(editor.getText());
                }}>
                <CopyIcon />
              </CustomButton>

              <CustomButton
                onlyIcon
                onClick={() => {
                  exportToFile(checker.content, "pdf");
                }}>
                <DownloadIcon />
              </CustomButton>

              <div className="position-relative">
                <CustomButton
                  iconSuffix={
                    <ArrowIcon
                      color={themeColors.colors.primary}
                      rotate={90}
                    />
                  }
                  outline
                  onClick={() => setDropDown(false)}>
                  {editor.getText().trim().split(/\s+/).length + " كلمات"}
                </CustomButton>
                {dropDown && (
                  <MultiOptionDropDown
                    top
                    options={[
                      {
                        value:
                          editor.getText().trim().split(/\s+/).length +
                          " كلمات",
                        className: "px-4 border-bottom mt-2",
                      },
                      {
                        value:
                          editor.getText().replace(/\s+/g, "").length + " حرف",
                        className: "px-4 border-bottom mt-2",
                      },
                      {
                        value:
                          editor.getText().split(". ").length - 1 + " جملة",
                        className: "px-4 border-bottom mt-2",
                      },
                    ]}
                    onClose={() => setDropDown(false)}
                  />
                )}
              </div>
              <CustomButton onClick={() => dispatch(correctMistakes({}))}>
                صحح الأخطاء
              </CustomButton>
              <CustomButton onlyIcon>
                <Stack
                  direction="horizontal"
                  className="rounded-circle border border-primary align-items-center justify-content-center position-relative"
                  style={{
                    width: "35px",
                    height: "35px",
                  }}>
                  <span className="position-absolute top-50 start-50 translate-middle">
                    {Object.keys(objectErrors || {}).length}
                  </span>
                </Stack>
              </CustomButton>
            </Stack>
          </Card>
        </Col>
      )}
    </>
  );
};

export default RightPanel;
