import { EditorContent } from "@tiptap/react";
import { Stack } from "react-bootstrap";
import CustomButton from "@/components/atoms/Button";
import PasteIcon from "@/assets/icons/Paste";
import UploadIcon from "@/assets/icons/Upload";
import Card from "./Card";
import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";
import pdf from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 1.png";
import html from "@/assets/Images/reformulate/html-file-type-svgrepo-com 1.png";
import txt from "@/assets/Images/reformulate/txt-file-type-svgrepo-com 1.png";
import doc from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 2.png";
import CopyIcon from "@/assets/icons/Copy";
import DownloadIcon from "@/assets/icons/Download";
import ArrowIcon from "@/assets/icons/Arrow";
import { themeColors } from "@/Util/theme";
import { BREAKPOINTS } from "../../helpers/constants";
import { useBreakpoint } from "use-breakpoint";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MdKeyboardArrowDown } from "react-icons/md";
import "../atoms/atoms.css";
import {
  correctMistake,
  correctMistakes,
  setContent,
} from "../../redux/features/api/apiSlice";
import { getTextFromFile } from "../../helpers/getTextFromFile";
import { exportToFile } from "../../helpers/exportToFile";
import lodash from "lodash";

const CheckerEditor = ({ editor }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [exportDropDown, setExportDropDown] = useState(false);

  const checker = useAppSelector((state) => state.checker);
  const objectErrors = checker.mistakes["Spelling Mistakes"];
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    editor
      .chain()
      .focus("end")
      .createParagraphNear()
      .insertContent(checker.checkerAi.aiResponse)
      .run();
  }, [checker.checkerAi.aiResponse]);

  useEffect(() => {
    document.querySelector(".btn-correct")?.addEventListener("click", (e) => {
      dispatch(
        correctMistake({
          mistake: [e.target.id],
          correct: e.target.textContent,
        })
      );
    });
  }, [checker.mistakes, dispatch]);

  const refExportDropdown = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        refExportDropdown.current &&
        !refExportDropdown.current.contains(event.target)
      ) {
        setExportDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refExportDropdown, setExportDropDown]);
  return (
    <>
      {!editor.getText().length && (
        <Stack
          direction="horizontal"
          gap={3}
          className={`position-absolute  ${
            isBelowDesktop
              ? "bottom-0 start-50 translate-middle w-100 justify-content-center "
              : "top-0 start-0 m-4"
          } `}>
          <CustomButton
            iconPrefix={
              <PasteIcon
                width={18}
                height={18}
              />
            }
            outline
            className="add-text custom-backbround-Button   px-4"
            onClick={() => {
              try {
                navigator.clipboard.readText().then((text) => {
                  dispatch(setContent(text));
                });
              } catch (error) {}
            }}>
            <span className="textcolor fw-bold ">ضع النص</span>
          </CustomButton>
          <CustomButton
            iconPrefix={
              <UploadIcon
                width={18}
                height={18}
              />
            }
            outline
            className="position-relative   custom-backbround-Button add-text">
            <input
              type="file"
              className="
              custom-backbround-Button
              opacity-0
              position-absolute
              w-100
              h-100
              top-0
              start-0
            "
              accept=".doc,.docx,.pdf,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append("file", file);
                  getTextFromFile(formData, checker.currentDoc).then((text) => {
                    dispatch(setContent(text));
                  });
                }
              }}
            />
            <span className="textcolor fw-bold">تحميل ملف</span>
          </CustomButton>
        </Stack>
      )}

      <div
        dangerouslySetInnerHTML={{
          __html: replaceHtmlWithHighlightedText(
            editor.getText(),
            checker.mistakes
          ),
        }}
        style={{ position: "absolute", cursor: "text" }}></div>
      <div
        className=" user-select-none"
        style={{
          opacity: 1,
          position: "absolute",
          color: "transparent",
          userSelect: "none" /* CSS property to disable selection */,
          MozUserSelect: "none" /* Firefox-specific CSS property */,
          WebkitUserSelect: "none" /* Safari/Chrome-specific CSS property */,
          msUserSelect: "none" /* Internet Explorer-specific CSS property */,
          // cursor: "default" /* Set default cursor to indicate unselectable */,
        }}>
        <EditorContent editor={editor} />
      </div>

      {!editor.getText() && (
        <Stack
          // Stack
          style={{
            opacity: 1,
            color: "#001B7940",
          }}
          className="place-holder position-absolute  fw-light fs-6">
          <span>
            ابدأ بكتابة نص أو ضع النص الذي تريد تدقيقه لُغَوِيّاً في المحرر{" "}
            <span style={{ fontFamily: "sans-serif" }}>(+V)</span>
            أو تحميل
          </span>
          <div>
            {" "}
            مستند{" "}
            <span style={{ fontFamily: "sans-serif" }}>(DOC،PDF،TXT)</span>.
          </div>
        </Stack>
      )}
      {!isBelowDesktop && (
        <Card
          style={{ width: "40%" }}
          className="position-absolute    bottom-0  copy-download-box  translate-middle mb-2 bg-light">
          <Stack
            className="d-flex justify-content-between"
            direction="horizontal"
            gap={5}>
            <CustomButton
              onlyIcon
              onClick={() => {
                navigator.clipboard.writeText(editor.getText());
              }}>
              <CopyIcon
                width={30}
                height={30}
              />
            </CustomButton>

            <CustomButton onlyIcon>
              <div
                ref={refExportDropdown}
                className="p-0 copystyle">
                <CustomButton
                  onlyIcon
                  className={"position-relative copystyle p-0"}
                  onClick={() => {
                    setExportDropDown((prev) => !prev);
                  }}>
                  {exportDropDown && (
                    <div
                      dir="ltr"
                      style={{ top: "-180px" }}
                      className="  dropListExport   position-absolute">
                      <button
                        onClick={() => handleDownloadHTML(editor)}
                        className="DroplistButton">
                        <div className="flex-grow-1 text-center">HTML</div>
                        <img
                          src={html}
                          className=" droplistImage"
                        />
                      </button>
                      <button
                        onClick={() => handleDownload(editor)}
                        className="DroplistButton">
                        <div className="flex-grow-1 text-center">TXT</div>
                        <img
                          src={txt}
                          className=" droplistImage"
                        />
                      </button>
                      <button
                        onClick={() => downloadPdf(editor)}
                        className="DroplistButton">
                        <div className=" flex-grow-1 text-center">PDF</div>
                        <img
                          src={pdf}
                          className=" droplistImage"
                        />
                      </button>
                      <button
                        onClick={() => downloadAsDocx(editor)}
                        className="DroplistButton">
                        <div className=" flex-grow-1 text-center">DOXC</div>
                        <img
                          src={doc}
                          className=" droplistImage"
                        />
                      </button>
                    </div>
                  )}

                  <DownloadIcon
                    width={25}
                    height={25}
                  />
                </CustomButton>
              </div>
            </CustomButton>

            <div className="position-relative ">
              <CustomButton
                className="errorButton customnumber-button d-flex justify-content-around gap-1 align-items-center"
                outline
                style={{
                  border: "1px solid #5225CE33",
                  // transitionDuration: "500ms",
                  // transitionDelay: "0ms",
                  padding: "5px 15px",
                  gap: "2px",
                }}
                onClick={() => setDropDown(!dropDown)}>
                <span
                  style={{
                    fontFamily: "sans-serif",
                    padding: "0px 2px",
                    fontWeight: "300",
                  }}>
                  {editor.getText().trim().split(/\s+/).length - 1}
                </span>
                <span>كلمات</span>
                <MdKeyboardArrowDown
                  className="stop-Transation  custom-arrow"
                  // style={{ width: "20px", height: "20px" }}
                />
              </CustomButton>
              {dropDown && (
                <MultiOptionDropDown
                  top
                  options={[
                    {
                      value: (
                        <div className=" d-flex gap-1 align-items-center text-center justify-content-start">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().replace(/\s+/g, "").length}{" "}
                          </span>
                          <span>كلمات</span>
                        </div>
                      ),
                      className: "px-4 fs-6 custom-word py-1  mt-2",
                    },
                    {
                      value: (
                        <div className=" d-flex gap-1  justify-content-start align-items-center">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().replace(/\s+/g, "").length}{" "}
                          </span>
                          <span>حروف</span>
                        </div>
                      ),
                      className: " fs-6 px-4 custom-word py-1  mt-2",
                    },
                    {
                      value: (
                        <div className=" d-flex gap-1 justify-content-start align-items-center">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().split(". ").length - 1}{" "}
                          </span>
                          <span>جملة</span>
                        </div>
                      ),
                      className: " fs-6 px-4 custom-word  py-1  mt-2",
                    },
                  ]}
                  onClose={() => setDropDown(false)}
                />
              )}
            </div>

            <CustomButton
              className="errorButton anther-text"
              onClick={() => dispatch(correctMistakes({}))}>
              صحح الأخطاء
            </CustomButton>
            <CustomButton
              className=" border-0"
              onlyIcon>
              <Stack
                direction="horizontal"
                className="rounded-circle number-copy-download-box   items-center justify-center position-relative"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid",
                }}>
                <div
                  className="position-absolute top-50 start-50"
                  style={{
                    transform: "translate(-50%,-50%)",
                    fontFamily: "sans-serif",
                    fontSize: "12px",
                  }}>
                  {
                    Object.keys(checker.mistakes["Spelling Mistakes"] || {})
                      .length
                  }
                </div>
              </Stack>
            </CustomButton>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default CheckerEditor;

const replaceHtmlWithHighlightedText = (html, objectMistakes) => {
  for (const mistakeKey in objectMistakes) {
    const mistakes = objectMistakes[mistakeKey];
    for (const mistake in mistakes) {
      if (!lodash.isArray(mistakes[mistake])) {
        const regEx = new RegExp("(" + mistake + ")(?!([^<]+)?>)", "gi");

        html = html.replaceAll(
          regEx,
          ` <div 
          class="${accordionData[mistakeKey]?.class}  hover-to-display"
          style="position:relative;display:inline;z-index:50;">
          ${" "}${mistake}
           <div class="popuptext" >
           <div class="popuptext-content">
  <div >
  <small class="text-info">

  الصواب
  </small>
  </div>
  <div>
  ${mistake} -> <span class="btn btn-primary btn-correct mistake-${mistake}" id="${mistake}"> ${
            mistakes[mistake]
          }</span>
            </div>
           </div>
              </div>
        </div>`
        );
      } else {
        const regEx = new RegExp("(" + mistake + ")(?!([^<]+)?>)", "gi");

        html = html.replaceAll(
          regEx,
          ` <div 
            class="${accordionData[mistakeKey]?.class} hover-to-display"
            style="position:relative;display:inline">
            ${mistake}
             <div class="popuptext" >
             <div class="popuptext-content">
  <div >
  <small class="text-info">

  الصواب
  </small>
  </div>
  <div>
  ${mistake} -> <span class="btn btn-primary btn-correct mistake-${mistake}" id="${mistake}"> ${mistakes[mistake][0]}</span>
            </div>
             </div>
                </div>
          </div>`
        );
      }
    }
  }
  return html;
};

const accordionData = {
  "Spelling Mistakes": {
    class: "mistake",
  },
  "Grammar Check": {
    class: "grammar",
  },
  Lexicon: {
    class: "lexicon",
  },
  Drafting: {
    class: "drafting",
  },
  "Other Corrections": {
    class: "other-corrections",
  },
};

const downloadPdf = (editor) => {
  // Check if elemitt is defined and not null
  if (!editor.getText()) {
    toast.error("العنصر غير معرف");
    return;
  }

  try {
    const opt = {
      margin: 1,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(editor.getText()).set(opt).save();
    toast.success("تم تحميل الملف");
  } catch (error) {
    console.log(error);
  }
};

export const handleDownloadHTML = (editor) => {
  try {
    if (editor.getText().length === 0)
      return toast.error("لا يوجد محتوي لتحميله");
    const blob = new Blob([editor.getHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "editor_content.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};

const handleDownload = (editor) => {
  if (editor.getText().length === 0)
    return toast.error("لا يوجد محتوي لتحميله");
  try {
    const element = document.createElement("a");
    const file = new Blob([editor.getText()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "editor_content.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("تم تحميل الملف ");
  } catch (error) {
    console.log(error);
  }
};
const downloadAsDocx = (editor) => {};
