import LinkIcon from "@/assets/icons/Link";
import AIIcon from "@/assets/icons/AI";
import BoldIcon from "@/assets/icons/Bold";
import ItalicIcon from "@/assets/icons/Italic";
import PenIcon from "@/assets/icons/Pen";
import ArrowIcon from "@/assets/icons/Arrow";
import { BulletList } from "@/assets/icons/BulletList";
import { BulleOutlinetList } from "@/assets/icons/BulletOutlineList";
import { SquareList } from "@/assets/icons/SquareList";
import { Numberlist } from "@/assets/icons/Numberlist";
import LetterList from "@/assets/icons/LetterList";
import GreekIList from "@/assets/icons/GreekIList";
import GreekList from "@/assets/icons/GreekList";
import UpperCaseGreekList from "@/assets/icons/UpperCaseGreekList";
import UppercaseLetterList from "@/assets/icons/UppercaseLetterList";
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
import DropdownColor from "../atoms/DropdownColor";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import LinkModal from "./LinkModal";
import ImageIcon from "@/assets/icons/Image";
import { insertImage } from "@/helpers/set-image";
import ListDropDown from "./ListDropDown";
import MultiOptionDropDown from "./MultiOptionDropDown";
import AIModal from "./AIModal";

const EditorToolbar = ({ editor, style = {}, iconSize = 24, gap = 4 }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");

  return (
    <Stack
      direction="horizontal"
      gap={gap}
      className={` border rounded-4 py-2 px-3 bg-light  mt-4 ${
        breakpoint !== "desktop" ? "w-100 py-1 px-2" : ""
      }`}
      style={{
        ...(breakpoint !== "desktop"
          ? { flexWrap: "wrap", justifyContent: "space-between" }
          : {
              height: "auto",
            }),
        ...style,
      }}
    >
      {getToolbarData(editor, iconSize).map((item, index) => (
        <ToolbarItem key={index} {...item} />
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
        style={{ width: "max-content" }}
      >
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
            <ListDropDown options={options} dropDownAction={dropDownAction} />
          )}
        </span>
        {!!title && (
          <span className="fw-medium text-primary fs-6">{title}</span>
        )}
      </Stack>
    </>
  );
};

const getToolbarData = (editor, iconSize) => [
  {
    icon: <LinkIcon width={iconSize} />,
    Modal: LinkModal,
  },
  {
    icon: <AIIcon width={iconSize} />,
    Modal: AIModal,
  },
  {
    icon: <BoldIcon width={iconSize} />,
    action: () => editor.chain().focus().toggleBold().run(),
  },
  {
    icon: <ItalicIcon width={iconSize} />,
    action: () => editor.chain().focus().toggleItalic().run(),
  },
  {
    icon: (
      <Stack direction="horizontal" gap={1} className="align-content-center">
        <span>
          <PenIcon width={iconSize} />
        </span>
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
        </span>
      </Stack>
    ),
    isColorDropDown: true,
    dropDownAction: (color) =>
      editor.chain().focus().setHighlight({ color }).run(),
  },
  {
    icon: (
      <Stack direction="horizontal" gap={1} className="align-content-center">
        <span>
          <UnderlineIcon width={iconSize} />
        </span>
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
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
        className="items-center justify-center"
      >
        <input
          type="text"
          pattern="[0-9]{5}"
          defaultValue={
            editor.getAttributes("textStyle")?.fontSize?.split("px")[0] || 16
          }
          style={{
            width: "27px",
            height: "27px",
            fontSize: "15px",
          }}
          className="text-center border border-primary rounded text-primary fw-medium"
          onBlur={(e) => {
            editor.chain().focus().setFontSize(`${e.target.value}px`).run();
          }}
        />
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
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
        className="align-content-center p-1 px-2 text-primary bg-reverse rounded"
      >
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
        </span>
        <span>
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
        className: "fs-6",
      },
      { value: "heading 1", className: "fs-1" },
      {
        value: "heading 2",
        className: "fs-2",
      },
      {
        value: "heading 3",
        className: "fs-3",
      },
      {
        value: "heading 4",
        className: "fs-4",
      },
      {
        value: "heading 5",
        className: "fs-5",
      },
      {
        value: "heading 6",
        className: "fs-6",
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
    icon: <RightAlignIcon width={iconSize} />,
    action: () => editor.chain().focus().setTextAlign("right").run(),
  },
  {
    icon: <CenterAlignIcon width={iconSize} height={iconSize} />,
    action: () => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: <LeftAlignIcon width={iconSize} />,
    action: () => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: (
      <>
        <span>
          <ListIcon width={iconSize} />
        </span>
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
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
          <OrderedListIcon width={iconSize} />
        </span>
        <span>
          <ArrowIcon
            rotate={90}
            width={10}
            height={10}
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
    icon: <LeftTabIcon width={iconSize} />,
    action: () =>
      editor
        .chain()
        .focus("end")

        .createParagraphNear()
        .insertContent("\t")
        .run(),
  },
  {
    icon: <RightTabIcon width={iconSize} />,
    action: () =>
      editor
        .chain()
        .focus("start")
        .createParagraphNear()
        .insertContent("\t")
        .run(),
  },
  {
    icon: <UndoIcon width={iconSize} />,
    action: () => editor.chain().focus().undo().run(),
  },
  {
    icon: <RedoIcon width={iconSize} />,
    action: () => editor.chain().focus().redo().run(),
  },
  {
    icon: <ImageIcon width={iconSize} height={iconSize} />,
    action: () => insertImage(editor),
  },
];

export default EditorToolbar;
