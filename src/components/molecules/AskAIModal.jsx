import CenteredModal from "./Modal";
import { Stack } from "react-bootstrap";
import CustomButton from "../atoms/Button";
import SendIcon from "@/assets/icons/Send";
import { useState } from "react";

const AskAIModal = ({ onClose, show, action }) => {
  const [content, setContent] = useState("");
  return (
    // <CenteredModal dir="rtl" onClose={onClose} show={show} size="lg">
    <Stack
      dir="rtl"
      gap={2}>
      <div className="title text-primary fs-4">مساعد متقن الذكي</div>
      <p className="fs-6 text-secondary">
        ماذا تريد أن تكتب أو بماذا تحتاجُ المساعدة؟
      </p>
      <Stack
        className="input border rounded"
        direction="horizontal">
        <input
          type="text"
          className="form-control outline-0 border-0"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <CustomButton
          onClick={() => {
            if (content) {
              action(content);
              onClose();
            }
          }}>
          <SendIcon />
        </CustomButton>
      </Stack>
    </Stack>
    // </CenteredModal>
  );
};

export default AskAIModal;
