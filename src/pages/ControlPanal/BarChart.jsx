import React from "react";
import "./barChart.css";

import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@material-ui/core/colors";

const theme = createTheme({
  typography: {
    fontFamily: "GE SS Two, GE SS Two",
  },
});

const StyledText = styled("text")(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText
      x={left + width / 2}
      y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function BarChart() {
  const data = [{ value: 20 }, { value: 10 }, { value: 15 }, { value: 5 }];

  const size = {
    width: 100,
    height: 200,
  };

  const palette = [
    "#001B79",
    "#ED5AB3",
    "rgba(5, 255, 0, 1)",
    " rgba(0, 0, 0, 0.08)",
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="bar-c shadow  rounded-4 h-100">
        <h3>الاستخدام</h3>
        <p>الاشتراك: تجريبي</p>
        <div className="d-flex align-items-center justify-content-center position-relative">
          <PieChart
            colors={palette}
            series={[
              {
                data,
                startAngle: -90,
                endAngle: 90,
                paddingAngle: 1,
                innerRadius: 90,
                outerRadius: 80,
              },
            ]}
            {...size}>
            <PieCenterLabel>75%</PieCenterLabel>
          </PieChart>
        </div>

        <div className="d-flex justify-content-around">
          <button className="btn ">الباقات</button>
          <button className="btn btn-outline-info">ترقية</button>
        </div>
      </div>
    </ThemeProvider>
  );
}
