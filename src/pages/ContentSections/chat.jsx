import { useParams } from "react-router-dom";
import { cards } from "../../assets/placeholder-data/ContentSections/cards";
import Grid from "@mui/material/Unstable_Grid2";
import EditorPanel from "../../elements/EditorPanel";
import { Container, Stack, Box } from "@mui/material";
import MyForm from "../../components/ContentSections/Chat/MyForm";
import ThemeWrapper from "../../components/ContentSections/ThemeWrapper";

export default function Chat() {
  const { id } = useParams();
  const card = cards[id];

  return (
    <ThemeWrapper>
      <Box sx={{ px: 3, width: "100%", height: "calc(100vh - 100px)" }}>
        <Stack
          justifyContent={"space-between"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          gap={3}
          height={"100%"}
        >
          <MyForm card={card}></MyForm>
          <Box
            width={"fit-content"}
            minWidth={400}
            flex={2}
            sx={{
              "& > div": { padding: "0 !important" },
            }}
          >
            <EditorPanel
              placeholderText={"كيف يمكنني مساعدتك اليوم؟"}
              isInner={true}
            />
          </Box>
        </Stack>
      </Box>
    </ThemeWrapper>
  );
}
