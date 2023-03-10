import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ButtonAppBar from "./components/ButtonAppBar";
import {
  Box,
  CssBaseline,
  Grid,
  Divider,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SelectionLabel from "./components/SelectionLabel";
import GraphMenu from "./components/GraphMenu";
import UsMap from "./components/UsMap";
import StateMap from "./components/StateMap";
import DisplayCharts from "./components/DisplayCharts";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [state, setState] = useState(""); //which state is selected
  const [hideMap, setMap] = useState(false); //decides whether to hide the US map/show state map
  const [graph, setGraph] = useState(-1); //which graph/chart to display
  const [switchMap, setSwitchMap] = useState(false); //false for enacted plan, true for sample plan
  const [district, setDistrict] = useState(-1); //which district number is chosen for a sample plan
  const [enactedPlan, setEnactedPlan] = useState(null);
  const [ensembleSMD, setEnsembleSMD] = useState(null);
  const [ensembleMMD, setEnsembleMMD] = useState(null);
  const [samplePlanMap, setSamplePlanMap] = useState(null);
  const [samplePlan, setSamplePlan] = useState(null);
  const [sampleName, setSampleName] = useState("");
  const [open, setOpen] = useState(-1);
  const [enactedPercentage, setEnactedPercentage] = useState(null);
  const [boxTag, setBoxTag] = useState("REPUBLICAN");
  const [layoutTag, setLayoutTag] = useState("0");
  const [opportunityTag, setOpportunityTag] = useState("BLACK");
  const seats = {"Georgia": 14, "Maryland": 8, "Mississippi": 4};
  const layouts = {"Georgia": ["5/5/4", "5/3/3/3", "4/4/3/3"], "Maryland": ["5/3", "4/4"], "Mississippi": ["4"]};
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <CssBaseline />
          <ButtonAppBar
            setMap={setMap}
            setState={setState}
            setSwitchMap={setSwitchMap}
            setDistrict={setDistrict}
          />
          <Grid container spacing={0}>
            <Grid item xs={2} backgroundColor="dimgray">
              <SelectionLabel
                state={state}
                district={district}
                setDistrict={setDistrict}
              ></SelectionLabel>
              <Divider></Divider>
              <GraphMenu
                state={state}
                graph={graph}
                setGraph={setGraph}
                district={district}
                setSamplePlanMap={setSamplePlanMap}
                setSamplePlan={setSamplePlan}
                setBoxTag={setBoxTag}
                setLayoutTag={setLayoutTag}
                layouts={layouts}
                open={open}
                setOpen={setOpen}            
                setSwitchMap={setSwitchMap}
                style={{ position: "absolute", top: "0vh", left: "0vh" }}
              ></GraphMenu>
            </Grid>
            <Grid item xs={7}>
              <DisplayCharts 
              graph={graph}
              ensembleSMD={ensembleSMD}
              ensembleMMD={ensembleMMD}
              state={state}
              seats={seats}
              enactedPlan={enactedPlan}
              samplePlan={samplePlan}
              district={district}
              layouts={layouts}
              boxTag={boxTag}
              setBoxTag={setBoxTag}
              layoutTag={layoutTag}
              setLayoutTag={setLayoutTag}
              enactedPercentage={enactedPercentage}
              opportunityTag={opportunityTag}
              setOpportunityTag={setOpportunityTag}
              setSamplePlan={setSamplePlan}
              setSamplePlanMap={setSamplePlanMap}
              setSwitchMap={setSwitchMap}
              setDistrict={setDistrict}
              sampleName={sampleName}
              setSampleName={setSampleName}
              ></DisplayCharts>
            </Grid>
            <Grid item xs={3} backgroundColor="#e3f2fd">
              {!hideMap && (
                <UsMap
                  setState={setState}
                  setMap={setMap}
                />
              )}
              {hideMap && (
                <StateMap
                  state={state}
                  district={district}
                  switchMap={switchMap}
                  setMap={setMap}
                  setDistrict={setDistrict}
                  setState={setState}
                  setSwitchMap={setSwitchMap}
                  setGraph={setGraph}
                  ensembleSMD={ensembleSMD}
                  setEnsembleSMD={setEnsembleSMD}
                  ensembleMMD={ensembleMMD}
                  setEnsembleMMD={setEnsembleMMD}
                  setOpen={setOpen}
                  setEnactedPercentage={setEnactedPercentage}
                  samplePlanMap={samplePlanMap}
                  setSamplePlanMap={setSamplePlanMap}
                  setSamplePlan={setSamplePlan}
                  setEnactedPlan={setEnactedPlan}
                  graph={graph}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
