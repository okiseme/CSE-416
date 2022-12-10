import Plot from 'react-plotly.js';
import React from 'react';
import { Box } from '@mui/system';

export default function RangeOfSplitsPlotSMD({
  ensembleSMD,
  state,
  seats
}) {
	let seat = seats[state];
  let dataX = [];
  for(let i = 0; i<=seat; i++) {
    dataX.push(i+"/"+(seat-i));
  }
  let dataY = [];
  let dataMap = ensembleSMD.seatShare.data;
  for(let key in dataMap) {
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
          title: "Range of Republican/Democratic Splits SMD",
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