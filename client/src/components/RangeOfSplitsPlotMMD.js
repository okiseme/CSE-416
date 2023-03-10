import Plot from 'react-plotly.js';
import React from 'react';
import { Box } from '@mui/system';

export default function RangeOfSplitsPlotMMD({
  ensembleMMD,
  state,
  seats
}) {
	let seat = seats[state];
  let dataX = [];
  let dataY = [];
  let dataMap = ensembleMMD.seatShare.data;
  for(let key in dataMap) {
    dataX.push(key);
    dataY.push(dataMap[key]);
  }

  return(
    <Box
      height="50%"
    >
      <Plot
        data={[{
            type: 'bar', 
            x: dataX, 
            y: dataY
        }]}
        layout={{
          title: "Range of Republican/Democratic Splits MMD",
          xaxis: {title: "Republican/Democratic"},
          yaxis: {title: "Number of Plans"}
        }}
        style={{
          position: 'relative'
        }}
      />
    </Box>
  );
}