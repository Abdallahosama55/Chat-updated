import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  direction: "rtl",
  typography: { fontFamily: "GE SS Two" },
  palette: {
    pink: "#EB59B1",
  },
  shadows: {
    tap: "0px 23px 9px rgba(156, 159, 211, 0.01), 0px 13px 8px rgba(156, 159, 211, 0.05), 0px 6px 6px rgba(156, 159, 211, 0.09), 0px 1px 3px rgba(156, 159, 211, 0.1)",
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function ThemeWrapper({ children }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">{children}</div>
      </ThemeProvider>
    </CacheProvider>
  );
}
