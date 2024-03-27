import { Box, createTheme, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import Header from "../../components/ContentSections/Sections/Header";
import CardsList from "../../components/ContentSections/Sections/CardsList";
import ThemeWrapper from "../../components/ContentSections/ThemeWrapper";
export default function ContentSections() {
  return (
    <ThemeWrapper>
      <Container>
        <Header />
        <Box sx={{ height: 50 }}></Box>
        <CardsList />
      </Container>
    </ThemeWrapper>
  );
}
