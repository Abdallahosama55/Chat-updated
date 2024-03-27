import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const days = Array.from({ length: 30 }, (_, index) => new Date(0, 0, index + 1)); // Your days data
const FranceGDPperCapita = [
  28129, 28294.264, 28619.805, 28336.16, 28907.977, 29418.863, 29736.645, 30341.807,
  31323.078, 32284.611, 33409.68, 33920.098, 34152.773, 34292.03, 35093.824,
  35495.465, 36166.16, 36845.684, 36761.793, 35534.926, 36086.727, 36691, 36571,
  36632, 36527, 36827, 37124, 37895, 38515.918,

]; // Your France GDP data
const UKGDPperCapita = [26189, 25792.014, 25790.186, 26349.342, 27277.543, 27861.215, 28472.248, 29259.764,
  30077.385, 30932.537, 31946.037, 32660.441, 33271.3, 34232.426, 34865.78,
  35623.625, 36214.07, 36816.676, 36264.79, 34402.36, 34754.473, 34971, 35185, 35618,
  36436, 36941, 37334, 37782.83, 38058.086,]; // Your UK GDP data
const GermanyGDPperCapita = [  25391, 26769.96, 27385.055, 27250.701, 28140.057, 28868.945, 29349.982, 30186.945,
  31129.584, 32087.604, 33367.285, 34260.29, 34590.93, 34716.44, 35528.715,
  36205.574, 38014.137, 39752.207, 40715.434, 38962.938, 41109.582, 43189, 43320,
  43413, 43922, 44293, 44689, 45619.785, 46177.617,]; // Your Germany GDP data
  const UKGDPperCapitaa = [16189, 25792.014, 25790.186, 26349.342, 27277.543, 27861.215, 28472.248, 29259.764,
    30077.385, 30932.537, 31946.037, 32660.441, 33271.3, 34232.426, 34865.78,
    35623.625, 36214.07, 36816.676, 36264.79, 34402.36, 34754.473, 34971, 35185, 35618,
    36436, 36941, 37334, 37782.83, 38058.086,]; // Your UK GDP data
const lineChartsParams = {
  series: [
    {
      label: 'مقالات',
      data: FranceGDPperCapita,
      showMark: false,
    },
    {
      label: 'تدقيق',
      data: GermanyGDPperCapita,
      showMark: false,
    },
    {
      label: 'صور',
      data: UKGDPperCapita,
      showMark: false,
    },
    {
      label: 'شات',
      data: UKGDPperCapitaa,
      showMark: false,
    },
  ],
  width: 400, // Initial width
  height: 400, // Initial height
};

const theme = createTheme({
  typography: {
    fontFamily: 'GE SS Two, sans-serif',
  },
});

const dayFormater = (date) => (date.getMonth() + 1) + '/' + date.getDate(); // Format date as 'MM/DD'
const currencyFormatter = new Intl.NumberFormat('en-US', {

}).format;

export default function Formatting() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const chartWidth = isSmallScreen ? 370 : 700; // Set the width based on the media query

  const lineChartsParamsWithWidth = {
    ...lineChartsParams,
    width: chartWidth,
  };

  const options = {
    scales: {
      y: {
        ticks: {
          font: {
            family: 'sans-serif', // Use GE SS Two for numbers
          },
        },
      },
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <div className='shadow bg-white rounded-4 py-3'>
      <span className=' ps-3 fw-bold '>أحصائيات المستخدم</span>
        <LineChart
       
          {...lineChartsParamsWithWidth}
          options={options}
          xAxis={[{ data: days, scaleType: 'point', valueFormatter: dayFormater }]}
          series={lineChartsParamsWithWidth.series.map((s) => ({
            ...s,
            valueFormatter: currencyFormatter,
          }))}
        />
      </div>
    </ThemeProvider>
  );
}
