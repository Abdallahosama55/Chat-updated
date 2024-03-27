import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useSelector, useDispatch } from "react-redux";
import { scroll } from "../../../redux/slices/contentSections/contentSectionsSlice";
import { useTheme } from "@mui/material";
export default function ScrollingMenu({ items }) {
  const scrolled = useSelector((state) => state.contentSections.scrolled);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={0}
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "space-around",

        // overflow: "hidden",
      }}
    >
      <Grid
        xs={9}
        lg={11}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            zIndex: theme.zIndex.drawer,
            [theme.breakpoints.down("lg")]: {
              position: "absolute",
              width: "fit-content",
              top: 80,
              left: 0,
              background: "white",
              transform: `scaleY(${scrolled ? 1 : 0})`,
              transformOrigin: "top",
              transitionDuration: "0.2s",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              whiteSpace: "nowrap",
              transform: `translateX(-${80 * scrolled}%)`,
              transitionDuration: "1.6s",
              transitionTimingFunction: "cubic-bezier(.4,1.1,.48,1.2)",
              [theme.breakpoints.down("lg")]: {
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: 1,
                boxShadow: theme.shadows.tap,
                transform: "none",
              },
            }}
          >
            {items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "inline-block",
                  width: "20%",
                  px: 0.5,
                  [theme.breakpoints.down("lg")]: {
                    width: "100%",
                  },
                }}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid
        xs={1}
        className="d-flex align-items-center"
        sx={{
          height: "100%",
          width: "fit-content",
          [theme.breakpoints.down("lg")]: {
            justifyContent: "center",
          },
        }}
      >
        <ArrowBackIosRoundedIcon
          sx={{
            transform: `rotateY(${180 * scrolled}deg)`,
            transitionDuration: "1s",
            width: "fit-content",
            padding: "0 0.8rem",
            fontSize: 19,
            color: "#001B79",
            transitionProperty: "all",
            [theme.breakpoints.down("lg")]: {
              transform: `rotate(-90deg) rotateY(${180 * scrolled}deg)`,
            },
          }}
          cursor={"pointer"}
          onClick={() => {
            dispatch(scroll());
          }}
        />
      </Grid>
    </Grid>
  );
}
