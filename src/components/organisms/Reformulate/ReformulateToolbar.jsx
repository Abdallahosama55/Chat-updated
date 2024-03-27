import LinkIcon from "@/assets/icons/Link";
import AIIcon from "@/assets/icons/AI";
import BoldIcon from "@/assets/icons/Bold";
import ItalicIcon from "@/assets/icons/Italic";
import PenIcon from "@/assets/icons/Pen";
import ArrowIcon from "@/assets/icons/Arrow";
import { themeColors } from "@/Util/theme";
import UnderlineIcon from "@/assets/icons/Underline";
import RightAlignIcon from "@/assets/icons/RightAlign";
import CenterAlignIcon from "@/assets/icons/CenterAlign";
import LeftAlignIcon from "@/assets/icons/LeftAlign";
import ListIcon from "@/assets/icons/List";
import OrderedListIcon from "@/assets/icons/OrderedList";
import LeftTabIcon from "@/assets/icons/LeftTab";
import RightTabIcon from "@/assets/icons/RightTab";
import UndoIcon from "@/assets/icons/Undo";
import RedoIcon from "@/assets/icons/Redo";
import { Stack } from "react-bootstrap";
import DropdownColor from "@/components/atoms/DropdownColor";
import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import MultiOptionDropDown from "@/components/molecules/MultiOptionDropDown";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import LinkModal from "@/components/molecules/LinkModal";
import ImageIcon from "@/assets/icons/Image";
import ListDropDown from "@/components/molecules/ListDropDown";

import "./Res.css";
import CopyIcon from "@/assets/icons/Copy";
import DownloadIcon from "@/assets/icons/Download";
import CustomButton from "@/components/atoms/Button";

import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";

import uploadicon from "@/assets/Images/reformulate/icons8_upload-2.png";
import linkurl from "@/assets/Images/reformulate/material-symbols_link.png";
import pdf from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 1.png";
import html from "@/assets/Images/reformulate/html-file-type-svgrepo-com 1.png";
import txt from "@/assets/Images/reformulate/txt-file-type-svgrepo-com 1.png";
import doc from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 2.png";
import linkImage from "@/assets/Images/reformulate/ph_link-bold.png";

import { Numberlist } from "@/assets/icons/Numberlist";
import LetterList from "@/assets/icons/LetterList";
import GreekList from "@/assets/icons/GreekList";
import GreekIList from "@/assets/icons/GreekIList";
import UppercaseLetterList from "@/assets/icons/UppercaseLetterList";
import UpperCaseGreekList from "@/assets/icons/UpperCaseGreekList";
import { BulletList } from "@/assets/icons/BulletList";
import { BulleOutlinetList } from "@/assets/icons/BulletOutlineList";
import { SquareList } from "@/assets/icons/SquareList";
import {
  downloadAsDocx,
  downloadPdf,
  handleDownload,
  handleDownloadHTML,
  insertImg,
} from "../../atoms/downloadContent/download";

const ReformulateToolbar = ({ editor, noGenerate }) => {
  const [exportDropDown, setExportDropDown] = useState(false);
  const refExportDropdown = useRef(null);
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const { data } = useAppSelector((state) => state.api.rephrasePost);
  const [openImage, setOpenImage] = useState(false);
  const [first, setFirst] = useState(false);
  const [sec, setSec] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenImage(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const id = data?.unique_id;
  return (
    <Stack
      direction="horizontal"
      className={`gapuser gap-3 w-100 justify-content-between  ${
        noGenerate ? " px-2" : " px-2"
      }    bg-light    ${breakpoint !== "desktop" ? "w-100 py-1 " : ""}`}
      style={
        breakpoint !== "desktop"
          ? { flexWrap: "wrap", justifyContent: "space-between" }
          : {
              height: "auto",
              gap: "16px",
              maxWidth: "100%",
              flexWrap: "wrap",
              minWidth: "100%",
              justifyContent: "space-between",
            }
      }>
      {getToolbarData(
        dropdownRef,
        setFirst,
        setSec,
        first,
        sec,
        openImage,
        setOpenImage,
        editor,
        noGenerate,
        id,

        exportDropDown,
        setExportDropDown,
        refExportDropdown
      ).map((item, index) => (
        <ToolbarItem
          key={index}
          {...item}
        />
      ))}
    </Stack>
  );
};

const ToolbarItem = ({
  icon,
  title,
  action,
  isColorDropDown,
  dropDownAction,
  isMultiOptionDropDown,
  options,
  Modal,
  isActiveOption,
  isListDropDown,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setOpenDropDown(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      {Modal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
            // setOpenPop(false);
          }}
          // show={openPop}
          show={openModal}
        />
      )}
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center"
        role="button"
        onClick={() => {
          if (action) {
            action();
          }
          if (isColorDropDown || isMultiOptionDropDown || isListDropDown) {
            setOpenDropDown((prev) => !prev);
          }
          if (Modal) {
            setOpenModal(true);
          }
        }}
        ref={ref}
        style={{ width: "max-content" }}>
        <span className="position-relative">
          {icon}
          {openDropDown && isColorDropDown && (
            <DropdownColor dropDownAction={dropDownAction} />
          )}
          {openDropDown && isMultiOptionDropDown && (
            <MultiOptionDropDown
              options={options}
              dropDownAction={dropDownAction}
              isActive={isActiveOption || 0}
            />
          )}
          {openDropDown && isListDropDown && (
            <ListDropDown
              options={options}
              dropDownAction={dropDownAction}
            />
          )}
        </span>
        {!!title && (
          <span className="fw-medium text-primary fs-6">{title}</span>
        )}
      </Stack>
    </>
  );
};

const getToolbarData = (
  dropdownRef,
  setFirst,
  setSec,
  first,
  sec,
  openImage,
  setOpenImage,
  editor,
  noGenerate,
  id,

  exportDropDown,
  setExportDropDown,
  refExportDropdown
) =>
  //Made it 2 array bcs not to add object case extra space in toolbar ?
  !noGenerate
    ? [
        {
          icon: (
            <img
              className=" linkhover"
              src={linkImage}
              style={{ height: "16px", width: "16px" }}
            />
          ),
          Modal: LinkModal,
        },
        {
          icon: (
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
                  width={16}
                  height={16}
                />
              </CustomButton>
            </div>
          ),
        },

        {
          icon: (
            <CustomButton
              className={" copystyle p-0"}
              onlyIcon
              onClick={() => {
                try {
                  if (editor.getText().length === 0)
                    return toast.error("لا يوجد محتوي لنسخه");
                  navigator.clipboard.writeText(editor.getText());
                  toast.success("تم نسخ النص");
                } catch (error) {
                  toast.error("حدث خطا اثناء النسخ");
                }
              }}>
              <CopyIcon
                width={16}
                height={16}
                noshow={"test"}
              />
            </CustomButton>
          ),
        },

        {
          icon: (
            <BoldIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().toggleBold().run(),
        },
        {
          icon: (
            <ItalicIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().toggleItalic().run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className=" ">
              <span>
                <PenIcon
                  width={16}
                  height={16}
                />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isColorDropDown: true,
          dropDownAction: (color) =>
            editor.chain().focus().setHighlight({ color }).run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className="align-content-center">
              <span>
                <UnderlineIcon
                  width={16}
                  height={16}
                />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isColorDropDown: true,
          dropDownAction: (color) =>
            editor.chain().focus().setColor(color).run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className="items-center justify-center">
              <input
                type="text"
                pattern="[0-9]{5}"
                defaultValue={
                  editor.getAttributes("textStyle")?.fontSize?.split("px")[0] ||
                  16
                }
                style={{
                  width: "16px",
                  height: "16px",
                  fontSize: "12px",
                  borderColor: "#5225CE",
                }}
                className="text-center border bordercustomColor  rounded-1 text-primary fw-medium"
                onBlur={(e) => {
                  editor
                    .chain()
                    .focus()
                    .setFontSize(`${e.target.value}px`)
                    .run();
                }}
              />
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isMultiOptionDropDown: true,
          options: [
            {
              value: "8",
              className: "px-2 py-0",
            },
            {
              value: "10",
              className: "px-2 py-0",
            },
            {
              value: "12",
              className: "px-2 py-0",
            },
            {
              value: "14",
              className: "px-2 py-0",
            },
            {
              value: "16",
              className: "px-2 py-0",
            },
            {
              value: "18",
              className: "px-2 py-0",
            },
          ],
          dropDownAction: (value) =>
            editor.chain().focus().setFontSize(`${value}px`).run(),
          isActiveOption: editor
            .getAttributes("textStyle")
            ?.fontSize?.split("px")[0],
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={0.5}
              className="align-content-center titlePragraph  text-primary bg-reverse  rounded-1">
              <span className=" px-1">
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
              <span
                style={{ padding: noGenerate ? "1px 2px " : "1px 2px" }}
                className={`position-relative   `}>
                {`${
                  editor.getAttributes("heading").level
                    ? `Heading ${editor.getAttributes("heading").level}`
                    : "paragraph"
                }`}
              </span>
            </Stack>
          ),
          options: [
            {
              value: "paragraph",
              className: "fs-6 firstFont2 ",
            },
            { value: "heading 1", className: "fs-1 firstFont" },
            {
              value: "heading 2",
              className: "fs-2 firstFont2",
            },
            {
              value: "heading 3",
              className: "fs-3 firstFont3",
            },
            {
              value: "heading 4",
              className: "fs-4 firstFont4",
            },
            {
              value: "heading 5",
              className: "fs-5 firstFont5",
            },
            {
              value: "heading 6",
              className: "fs-6 firstFont6",
            },
          ],
          isMultiOptionDropDown: true,
          dropDownAction: (value) => {
            editor.chain().focus().unsetFontSize().run();

            if (value === "paragraph")
              editor.chain().focus().setParagraph().run();
            if (value === "heading 1") {
              editor.chain().focus().setHeading({ level: 1 }).run();
            }
            if (value === "heading 2") {
              editor.chain().focus().setHeading({ level: 2 }).run();
            }
            if (value === "heading 3") {
              editor.chain().focus().setHeading({ level: 3 }).run();
            }
            if (value === "heading 4") {
              editor.chain().focus().setHeading({ level: 4 }).run();
            }
            if (value === "heading 5") {
              editor.chain().focus().setHeading({ level: 5 }).run();
            }
            if (value === "heading 6") {
              editor.chain().focus().setHeading({ level: 6 }).run();
            }
          },
          isActiveOption: editor.getAttributes("heading").level,
        },
        {
          icon: (
            <RightAlignIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().setTextAlign("right").run(),
        },
        {
          icon: (
            <CenterAlignIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().setTextAlign("center").run(),
        },
        {
          icon: (
            <LeftAlignIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().setTextAlign("left").run(),
        },
        {
          icon: (
            <>
              <span>
                <ListIcon
                  width={16}
                  height={16}
                />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </>
          ),
          isListDropDown: true,
          options: [
            {
              value: <BulletList />,
            },
            {
              value: <BulleOutlinetList />,
            },
            {
              value: <SquareList />,
            },
          ],
          dropDownAction: () => {
            editor.chain().focus().toggleBulletList().run();
          },
        },
        {
          icon: (
            <>
              <span>
                <OrderedListIcon
                  width={15}
                  height={15}
                />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </>
          ),
          isListDropDown: true,
          options: [
            {
              value: (
                <Numberlist
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <LetterList
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <GreekList
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <GreekIList
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <UppercaseLetterList
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <UpperCaseGreekList
                  width={70}
                  height={70}
                />
              ),
            },
          ],
          dropDownAction: () =>
            editor.chain().focus().toggleOrderedList().run(),
        },
        {
          icon: (
            <LeftTabIcon
              width={16}
              height={16}
            />
          ),
          action: () =>
            editor
              .chain()
              .focus("end")
              .createParagraphNear()
              .insertContent("\t")
              .run(),
        },
        {
          icon: (
            <RightTabIcon
              width={16}
              height={16}
            />
          ),
          action: () =>
            editor
              .chain()
              .focus("start")
              .createParagraphNear()
              .insertContent("\t")
              .run(),
        },
        {
          icon: (
            <UndoIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().undo().run(),
        },
        {
          icon: (
            <RedoIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().redo().run(),
        },
        {
          icon: (
            <div ref={dropdownRef}>
              <div onClick={() => setOpenImage((imge) => !imge)}>
                <ImageIcon
                  width={16}
                  height={16}
                  noshow={"test"}
                />
                {openImage && (
                  <div className=" d-flex gap-3 px-2 py-1 position-absolute links-Containerss bg-white">
                    <div>
                      <img
                        onClick={() => insertImg(editor, id)}
                        onMouseEnter={() => setFirst(true)}
                        onMouseLeave={() => setFirst(false)}
                        src={uploadicon}
                        style={{ maxHeight: "16px", maxWidth: "16px" }}
                      />
                    </div>
                    <div className=" position-relative">
                      <img
                        onMouseEnter={() => {
                          setSec(true);
                        }}
                        onMouseLeave={() => setSec(false)}
                        src={linkurl}
                        style={{ maxHeight: "16px", maxWidth: "16px" }}
                      />
                    </div>
                    {first && (
                      <>
                        <button
                          style={{ borderRadius: "8px" }}
                          className="  px-2 py-1 position-absolute imageCustom ">
                          إضافة رابط
                        </button>
                        <div
                          style={{ top: "65px", fontSize: "12px" }}
                          className="position-absolute ">
                          إدراج
                        </div>
                      </>
                    )}
                    {sec && (
                      <button className="  position-absolute imageCustom ">
                        <div></div>
                        اسحب صورة هنا <br />
                        أو
                        <br /> اضغط
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ),
        },
      ]
    : [
        {
          icon: (
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
                  width={16}
                  height={16}
                />
              </CustomButton>
            </div>
          ),
        },

        {
          icon: (
            <CustomButton
              className={" copystyle p-0"}
              onlyIcon
              onClick={() => {
                try {
                  if (editor.getText().length === 0)
                    return toast.error("لا يوجد محتوي لنسخه");
                  navigator.clipboard.writeText(editor.getText());
                  toast.success("تم نسخ النص");
                } catch (error) {
                  toast.error("حدث خطا اثناء النسخ");
                }
              }}>
              <CopyIcon
                width={16}
                height={16}
                noshow={"test"}
              />
            </CustomButton>
          ),
        },

        {
          icon: (
            <BoldIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().toggleBold().run(),
        },
        {
          icon: (
            <ItalicIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().toggleItalic().run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className=" ">
              <span>
                <PenIcon
                  width={16}
                  height={16}
                />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isColorDropDown: true,
          dropDownAction: (color) =>
            editor.chain().focus().setHighlight({ color }).run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className="align-content-center">
              <span>
                <UnderlineIcon
                  width={16}
                  height={16}
                />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isColorDropDown: true,
          dropDownAction: (color) =>
            editor.chain().focus().setColor(color).run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className="items-center justify-center">
              <input
                type="text"
                pattern="[0-9]{5}"
                defaultValue={
                  editor.getAttributes("textStyle")?.fontSize?.split("px")[0] ||
                  16
                }
                style={{
                  width: "16px",
                  height: "16px",
                  fontSize: "12px",
                  borderColor: "#5225CE",
                }}
                className="text-center border bordercustomColor  rounded-1 text-primary fw-medium"
                onBlur={(e) => {
                  editor
                    .chain()
                    .focus()
                    .setFontSize(`${e.target.value}px`)
                    .run();
                }}
              />
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isMultiOptionDropDown: true,
          options: [
            {
              value: "8",
              className: "px-2 py-0",
            },
            {
              value: "10",
              className: "px-2 py-0",
            },
            {
              value: "12",
              className: "px-2 py-0",
            },
            {
              value: "14",
              className: "px-2 py-0",
            },
            {
              value: "16",
              className: "px-2 py-0",
            },
            {
              value: "18",
              className: "px-2 py-0",
            },
          ],
          dropDownAction: (value) =>
            editor.chain().focus().setFontSize(`${value}px`).run(),
          isActiveOption: editor
            .getAttributes("textStyle")
            ?.fontSize?.split("px")[0],
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={0.5}
              className="align-content-center titlePragraph  text-primary bg-reverse  rounded-1">
              <span className=" px-1">
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
              <span
                style={{ padding: noGenerate ? "1px 2px " : "1px 2px" }}
                className={`position-relative   `}>
                {`${
                  editor.getAttributes("heading").level
                    ? `Heading ${editor.getAttributes("heading").level}`
                    : "paragraph"
                }`}
              </span>
            </Stack>
          ),
          options: [
            {
              value: "paragraph",
              className: "fs-6 firstFont2 ",
            },
            { value: "heading 1", className: "fs-1 firstFont" },
            {
              value: "heading 2",
              className: "fs-2 firstFont2",
            },
            {
              value: "heading 3",
              className: "fs-3 firstFont3",
            },
            {
              value: "heading 4",
              className: "fs-4 firstFont4",
            },
            {
              value: "heading 5",
              className: "fs-5 firstFont5",
            },
            {
              value: "heading 6",
              className: "fs-6 firstFont6",
            },
          ],
          isMultiOptionDropDown: true,
          dropDownAction: (value) => {
            editor.chain().focus().unsetFontSize().run();

            if (value === "paragraph")
              editor.chain().focus().setParagraph().run();
            if (value === "heading 1") {
              editor.chain().focus().setHeading({ level: 1 }).run();
            }
            if (value === "heading 2") {
              editor.chain().focus().setHeading({ level: 2 }).run();
            }
            if (value === "heading 3") {
              editor.chain().focus().setHeading({ level: 3 }).run();
            }
            if (value === "heading 4") {
              editor.chain().focus().setHeading({ level: 4 }).run();
            }
            if (value === "heading 5") {
              editor.chain().focus().setHeading({ level: 5 }).run();
            }
            if (value === "heading 6") {
              editor.chain().focus().setHeading({ level: 6 }).run();
            }
          },
          isActiveOption: editor.getAttributes("heading").level,
        },
        {
          icon: (
            <RightAlignIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().setTextAlign("right").run(),
        },
        {
          icon: (
            <CenterAlignIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().setTextAlign("center").run(),
        },
        {
          icon: (
            <LeftAlignIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().setTextAlign("left").run(),
        },
        {
          icon: (
            <>
              <span>
                <ListIcon
                  width={16}
                  height={16}
                />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </>
          ),
          isListDropDown: true,
          options: [
            {
              value: <BulletList />,
            },
            {
              value: <BulleOutlinetList />,
            },
            {
              value: <SquareList />,
            },
          ],
          dropDownAction: () => {
            editor.chain().focus().toggleBulletList().run();
          },
        },
        {
          icon: (
            <>
              <span>
                <OrderedListIcon
                  width={15}
                  height={15}
                />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </>
          ),
          isListDropDown: true,
          options: [
            {
              value: (
                <Numberlist
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <LetterList
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <GreekList
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <GreekIList
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <UppercaseLetterList
                  width={70}
                  height={70}
                />
              ),
            },
            {
              value: (
                <UpperCaseGreekList
                  width={70}
                  height={70}
                />
              ),
            },
          ],
          dropDownAction: () =>
            editor.chain().focus().toggleOrderedList().run(),
        },
        {
          icon: (
            <LeftTabIcon
              width={16}
              height={16}
            />
          ),
          action: () =>
            editor
              .chain()
              .focus("end")
              .createParagraphNear()
              .insertContent("\t")
              .run(),
        },
        {
          icon: (
            <RightTabIcon
              width={16}
              height={16}
            />
          ),
          action: () =>
            editor
              .chain()
              .focus("start")
              .createParagraphNear()
              .insertContent("\t")
              .run(),
        },
        {
          icon: (
            <UndoIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().undo().run(),
        },
        {
          icon: (
            <RedoIcon
              width={16}
              height={16}
            />
          ),
          action: () => editor.chain().focus().redo().run(),
        },
        {
          icon: (
            <div ref={dropdownRef}>
              <div onClick={() => setOpenImage((imge) => !imge)}>
                <ImageIcon
                  width={16}
                  height={16}
                  noshow={"test"}
                />
                {openImage && (
                  <div className=" d-flex gap-3 px-2 py-1 position-absolute links-Containerss bg-white">
                    <div>
                      <img
                        onClick={() => insertImg(editor, id)}
                        onMouseEnter={() => setFirst(true)}
                        onMouseLeave={() => setFirst(false)}
                        src={uploadicon}
                        style={{ maxHeight: "16px", maxWidth: "16px" }}
                      />
                    </div>
                    <div className=" position-relative">
                      <img
                        onMouseEnter={() => {
                          setSec(true);
                        }}
                        onMouseLeave={() => setSec(false)}
                        src={linkurl}
                        style={{ maxHeight: "16px", maxWidth: "16px" }}
                      />
                    </div>
                    {first && (
                      <>
                        <button
                          style={{ borderRadius: "8px" }}
                          className="  px-2 py-1 position-absolute imageCustom ">
                          إضافة رابط
                        </button>
                        <div
                          style={{ top: "65px", fontSize: "12px" }}
                          className="position-absolute ">
                          إدراج
                        </div>
                      </>
                    )}
                    {sec && (
                      <button className="  position-absolute imageCustom ">
                        <div></div>
                        اسحب صورة هنا <br />
                        أو
                        <br /> اضغط
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ),
        },
      ];

export default ReformulateToolbar;
