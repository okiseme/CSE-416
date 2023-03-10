import { Box } from "@mui/system";
import Plot from "react-plotly.js";

export default function BoxWhiskersPlotMMD({ensembleMMD, layoutTag, boxTag, enactedPercentage}) {
  let dataArr = ensembleMMD.boxAndWhiskers[layoutTag][boxTag];
  let s = boxTag.toLowerCase()+"Percentages";
  let dataScatter = enactedPercentage[s];
  let dataX = [];
  let dataY = [];
  let dataSX = [];
  let dataSY = [];
  let i = 1;
  for(let arr in dataArr) {  
    for(let j in dataArr[arr]) {
      dataX.push(i);
      dataY.push(dataArr[arr][j]);
    }
    dataSX.push(i);
    dataSY.push(dataScatter.data[i-1][0]);
    i++;
  }
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return (
    <Box
      height="100%"
    >
      <Plot
        data={[{
          type: 'box',
          x: dataX,
          y: dataY,
          name: "MMD"
        }, {
          type: 'scatter',
          x: dataSX,
          y: dataSY,
          mode: "markers",
          name: "Enacted"
        }
      ]}
        layout={{
          title: "Box and Whiskers MMD "+layoutTag,
          xaxis: {title: "Indexed Representatives",
          autotick: false,
          dtick: 1,
          showline: true,
          linewidth: 1
        },
          yaxis: {title: "Percentage of " + (boxTag==="BLACK"? "african americans" : capitalize(boxTag) + "s"),
          dtick: 0.1,
          showline: true,
          linewidth: 1,
          range: [0, 1]
        },
        }}
        style={{
          position: 'relative'
        }}
      ></Plot>
    </Box>
  );
}