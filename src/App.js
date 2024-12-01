import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css"


import { ContextProvider } from "./components/BussinessContext";
import BussinessCalculator from "./components/BussinessCalculator";
import BussinessTable from "./components/BussinessTable";
import CurveChart from "./components/CurveChart";
import FixedCost from "./components/FixedCost";


const App = () => {
  return (
    <div className="appContainer">
      <ContextProvider>
              <FixedCost/>
              <BussinessCalculator />
              <BussinessTable />
              <CurveChart />
      </ContextProvider>
      
    </div>
    
  );
};

export default App;