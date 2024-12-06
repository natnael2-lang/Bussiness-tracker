import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css"


import { ContextProvider } from "./components/BussinessContext";
import BussinessCalculator from "./components/BussinessCalculator";
import BussinessTable from "./components/BussinessTable";
import CurveChart from "./components/CurveChart";
import FixedCost from "./components/FixedCost";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard"
import { BussinessContext } from "./components/BussinessContext";


const App = () => {
        
  const {menu}=useContext(BussinessContext);
 
  return (
  
       

        
   
            <div className={`appContainer ${menu?"appcontainer-menu":""}`}>
            <div className="app-containt" style={{ overflowY:"auto" ,width:"100%" ,height:"100%",position:"relative" }}>
          
           <FixedCost/>
           <Router>
       <Navbar/>
         <Routes>
        
           <Route path="/home" element={<Home/>}/>
           <Route path="/" element={<Dashboard/>}/>
          
         </Routes>
       </Router>
         
         
         </div>
 
         </div>
        
       


      
    
      

    
  );
};

export default App;