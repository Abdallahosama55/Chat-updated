import TashkilIcon from "@/assets/icons/Tashkil";
import RemoveTashkilIcon from "@/assets/icons/RemoveTashkil";
import MagicStickIcon from "@/assets/icons/MagicStick";
import LinkIcon from "@/assets/icons/Link";
import AIIcon from "@/assets/icons/AI";
import BoldIcon from "@/assets/icons/Bold";
import ItalicIcon from "@/assets/icons/Italic";
import PenIcon from "@/assets/icons/Pen";
import ArrowIcon from "@/assets/icons/Arrow";
import { themeColors } from "@/Util/theme";
import UnderlineIcon from "@/assets/icons/Underline";
import AIImage from "@/assets/Images/detector/ph_link-bold.png";
import RightAlignIcon from "@/assets/icons/RightAlign";
import toast from "react-hot-toast";
import CenterAlignIcon from "@/assets/icons/CenterAlign";
import LeftAlignIcon from "@/assets/icons/LeftAlign";
import ListIcon from "@/assets/icons/List";
import OrderedListIcon from "@/assets/icons/OrderedList";
import LeftTabIcon from "@/assets/icons/LeftTab";
import RightTabIcon from "@/assets/icons/RightTab";
import UndoIcon from "@/assets/icons/Undo";
import html2pdf from "html2pdf.js";
import RedoIcon from "@/assets/icons/Redo";
import { Stack } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import LinkModal from "./LinkModal";
import { tashkeel } from "@/helpers/tashkeel";
import { removeTashkeel } from "@/helpers/removeTashkeel";
import { useAppDispatch } from "@/redux/hooks";
import { rephraseText } from "@/redux/features/api/apiSlice";
import ListDropDown from "./ListDropDown";
import { BulletList } from "@/assets/icons/BulletList";
import { BulleOutlinetList } from "@/assets/icons/BulletOutlineList";
import { SquareList } from "@/assets/icons/SquareList";
import { Numberlist } from "@/assets/icons/Numberlist";
import LetterList from "@/assets/icons/LetterList";
import GreekIList from "@/assets/icons/GreekIList";
import GreekList from "@/assets/icons/GreekList";
import UpperCaseGreekList from "@/assets/icons/UpperCaseGreekList";
import UppercaseLetterList from "@/assets/icons/UppercaseLetterList";
import DropdownColor from "../atoms/DropdownColor";
import AIModal from "./AIModal";
import MultiOptionDropDown from "./MultiOptionDropDown";
import "../atoms/atoms.css";

const Toolbar = ({ editor }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const dispatch = useAppDispatch();
  return (
    <Stack
      direction="horizontal"
      className={` border rounded-2 py-1 px-2 bg-light  ${
        breakpoint !== "desktop" ? "w-100 mt-4 py-1 px-2" : ""
      }`}
      style={
        breakpoint !== "desktop"
          ? { flexWrap: "wrap", justifyContent: "space-between", gap: "20px" }
          : { flexWrap: "wrap", gap: "20px" }
      }>
      {getToolbarData(editor, dispatch).map((item, index) => (
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
          }}
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
              onClose={() => setOpenDropDown(false)}
            />
          )}
          {openDropDown && isListDropDown && (
            <ListDropDown
              options={options}
              dropDownAction={dropDownAction}
            />
          )}
        </span>
        {!!title && <span className="fw-medium text-primary ">{title}</span>}
      </Stack>
    </>
  );
};

const getToolbarData = (editor, dispatch) => [
  {
    icon: (
      <TashkilIcon
        width={20}
        height={20}
      />
    ),
    title: "تشكيل",
    action: () => {
      const { view, state } = editor;
      const { from, to } = view.state.selection;
      const text = state.doc.textBetween(from, to);
      tashkeel(text).then((res) =>
        editor
          .chain()
          .focus()
          .insertContentAt(
            {
              from: from - 1,
              to,
            },
            res
          )
          .run()
      );
    },
  },
  {
    icon: (
      <RemoveTashkilIcon
        width={20}
        height={20}
      />
    ),
    title: "إزالة التشكيل",
    action: async () => {
      const { view, state } = editor;
      const { from, to } = view.state.selection;
      const text = state.doc.textBetween(from, to);
      const removeedText = await removeTashkeel(text);
      editor
        .chain()
        .focus()
        .insertContentAt(
          {
            from: from,
            to,
          },
          removeedText
        )
        .run();
    },
  },
  {
    icon: (
      <MagicStickIcon
        width={20}
        height={20}
      />
    ),
    title: "إعادة الصياغة",
    action: () => {
      dispatch(rephraseText());
    },
  },
  {
    icon: (
      <LinkIcon
        width={20}
        height={20}
      />
    ),
    Modal: LinkModal,
  },
  {
    icon: (
      <img
        src={AIImage}
        style={{ width: "20px", height: "20px" }}
      />
    ),
    Modal: AIModal,
  },
  {
    icon: (
      <BoldIcon
        width={20}
        height={20}
      />
    ),
    action: () => editor.chain().focus().toggleBold().run(),
  },
  {
    icon: (
      <ItalicIcon
        width={20}
        height={20}
      />
    ),
    action: () => editor.chain().focus().toggleItalic().run(),
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center">
        <span>
          <PenIcon
            width={20}
            height={20}
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
            width={20}
            height={20}
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
    dropDownAction: (color) => editor.chain().focus().setColor(color).run(),
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
            editor.getAttributes("textStyle")?.fontSize?.split("px")[0] || 16
          }
          style={{
            width: "20px",
            height: "20px",
            fontSize: "12px",
          }}
          className="text-center border border-primary rounded text-primary fw-medium"
          onBlur={(e) => {
            editor.chain().focus().setFontSize(`${e.target.value}px`).run();
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
    isActiveOption: editor.getAttributes("textStyle")?.fontSize?.split("px")[0],
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        style={{ padding: "2px 8px" }}
        className="align-content-center  text-primary bg-reverse rounded">
        <span>
          <ArrowIcon
            rotate={90}
            width={8}
            height={8}
            color={themeColors.colors.primary}
          />
        </span>
        <span style={{ fontSize: "14px", fontFamily: "sans-serif" }}>
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
        className: "fontsize1",
      },
      { value: "heading 1", className: "fontsize1" },
      {
        value: "heading 2",
        className: "fontsize2",
      },
      {
        value: "heading 3",
        className: "fontsize3",
      },
      {
        value: "heading 4",
        className: "fontsize4",
      },
      {
        value: "heading 5",
        className: "fontsize5",
      },
      {
        value: "heading 6",
        className: "fontsize6",
      },
    ],
    isMultiOptionDropDown: true,
    dropDownAction: (value) => {
      editor.chain().focus().unsetFontSize().run();

      if (value === "paragraph") editor.chain().focus().setParagraph().run();
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
        width={20}
        height={20}
      />
    ),
    action: () => editor.chain().focus().setTextAlign("right").run(),
  },
  {
    icon: (
      <CenterAlignIcon
        width={20}
        height={20}
      />
    ),
    action: () => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: (
      <LeftAlignIcon
        width={20}
        height={20}
      />
    ),
    action: () => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: (
      <>
        <span>
          <ListIcon
            width={20}
            height={20}
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
            width={20}
            height={20}
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
        value: <Numberlist />,
      },
      {
        value: <LetterList />,
      },
      {
        value: <GreekList />,
      },
      {
        value: <GreekIList />,
      },
      {
        value: <UppercaseLetterList />,
      },
      {
        value: <UpperCaseGreekList />,
      },
    ],
    dropDownAction: () => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: (
      <LeftTabIcon
        width={20}
        height={20}
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
        width={20}
        height={20}
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
        width={20}
        height={20}
      />
    ),
    action: () => editor.chain().focus().undo().run(),
  },
  {
    icon: (
      <RedoIcon
        width={20}
        height={20}
      />
    ),
    action: () => editor.chain().focus().redo().run(),
  },
];

export default Toolbar;

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
