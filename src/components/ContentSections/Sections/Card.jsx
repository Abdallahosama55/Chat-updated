import Paper from "../Paper";
import { Stack, Typography, Box } from "@mui/material";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";

export default function Card({
  favEn,
  image,
  title,
  body,
  onClickFav,
  onClick,
}) {
  return (
    <Paper
      onClick={onClick}
      changes={[favEn]}
      sx={{
        padding: "2rem",
        height: "100%",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      <Stack flexDirection={"column"} alignItems={"start"} gap={2}>
        <Stack
          justifyContent={"space-between"}
          alignItems={"start"}
          flexDirection={"row"}
          width={"100%"}
        >
          <img src={image} />
          <Box
            component="span"
            sx={{ fontSize: 30, cursor: "pointer", opacity: "60%" }}
            onClick={onClickFav}
          >
            {favEn ? (
              <IoMdStar color={"#EB59B1"} />
            ) : (
              <IoMdStarOutline color={"#001A78"} />
            )}
          </Box>
        </Stack>
        <Typography
          variant="h6"
          color={"#692BEF"}
          fontSize={16}
          fontWeight={500}
          textAlign={"start"}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color={"#001A78"}
          fontSize={14}
          fontWeight={300}
          maxWidth={230}
          textAlign={"start"}
        >
          {body}
        </Typography>
      </Stack>
    </Paper>
  );
}
