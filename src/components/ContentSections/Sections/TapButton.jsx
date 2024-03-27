import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
export default function TapButton({ sx, children, onClick, selected }) {
  const theme = useTheme();
  const CompTapButton = styled(Button)(({ selected }) => ({
    border: "1px solid #E7ECFF",
    borderRadius: "50px",
    width: "100%",
    fontSize: selected ? 15 : 16,
    fontWeight: selected ? 700 : 300,
    height: "100%",
    color: selected ? "#FFFFFF" : "#001B79",
    background: selected ? "#5225CE" : "none",
    transitionDuration: "1s",
    p: 1,
    [selected ? "&:hover" : ""]: {
      background: "#5225CE",
    },
    [theme.breakpoints.down("lg")]: {
      borderRadius: "10px",
    },
  }));
  return (
    <CompTapButton sx={sx} onClick={onClick} selected={selected}>
      {children}
    </CompTapButton>
  );
}
