import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { categories } from "../../../assets/placeholder-data/ContentSections/cards";
import Paper from "../Paper";
import SearchInput from "./SearchInput";
import ScrollingMenu from "./ScrollingMenu";
import TapButton from "./TapButton";
import { useSelector, useDispatch } from "react-redux";
import { favToggel } from "../../../redux/slices/contentSections/contentSectionsSlice";
import { setCategory } from "../../../redux/slices/contentSections/contentSectionsSlice";
import { useTheme } from "@mui/material";
export default function Header() {
  const theme = useTheme();
  const favEn = useSelector((state) => state.contentSections.favEn);
  const currCategory = useSelector(
    (state) => state.contentSections.currCategory
  );
  const scrolled = useSelector((state) => state.contentSections.scrolled);
  const dispatch = useDispatch();
  return (
    <>
      <Box
        className="d-flex justify-content-between mt-5 align-items-center flex-wrap"
        sx={{ fontWeight: 600, fontSize: { xs: 15, sm: 20, md: 20, lg: 20 } }}
      >
        <Typography variant="h6" sx={{ color: "#001A78", fontSize: "inherit" }}>
          {"أنشئ أكثر من 80 نوعًا من نماذج المحتوى في ثوانٍ باستخدام "}
          <Typography component={"span"} sx={{ color: "#5225ce" }}>
            {"مُتقِن"}
          </Typography>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#001A78",
            fontWeight: "inherit",
            fontSize: "inherit",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => {
            dispatch(favToggel());
          }}
        >
          {" المفضلة"}

          <Box component={"span"} sx={{ fontSize: "1.2em" }}>
            {favEn ? (
              <IoMdStar color={theme.palette.pink} />
            ) : (
              <IoMdStarOutline />
            )}
          </Box>
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: "3rem", transitionDuration: 1 }}>
        <Grid xs={3} lg={10} sx={{ transitionDuration: "1s" }}>
          <Paper sx={{ height: 80 }} changes={[currCategory]}>
            <ScrollingMenu
              items={[
                ...categories.map((category) => (
                  <TapButton
                    selected={category === currCategory ? true : false}
                    onClick={() => {
                      dispatch(setCategory({ category }));
                    }}
                  >
                    {category}
                  </TapButton>
                )),
              ]}
            />
          </Paper>
        </Grid>

        <Grid
          xs={9}
          lg={2}
          sx={{
            transitionDuration: "1s",
            overflow: "hidden",
          }}
        >
          <Paper
            sx={{
              height: 80,
            }}
          >
            <SearchInput />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
