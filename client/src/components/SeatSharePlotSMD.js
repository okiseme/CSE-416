import Plot from 'react-plotly.js';
import React from 'react';

export default function SeatSharePlotSMD({
  ensembleSMD
}) {
  let dataX = [10, 40, 50, 60, 90];
  let dataY = [10, 20, 50, 80, 90];
  // let dataMap = ensembleSMD.seatShare.data;
  // for(let key in dataMap) {
  //   dataY.push(dataMap[key]);
  // }

  return(
    <Plot
      data={[{
          mode: "lines+markers",
          x: dataX, 
          y: dataY
      }
    ]}
      layout={{
        title: "Seat Share vs Vote Share SMD",
        xaxis: {title: "Hypothetical Republican Seat%"},
        yaxis: {title: "Hypothetical Republican Vote%"}
      }}
      style={{
        position: 'relative'
      }}
    />
  );
}