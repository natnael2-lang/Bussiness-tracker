import { createContext, useEffect, useState } from "react";

export const BussinessContext = createContext();

export const ContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [calc, setCalc] = useState([]);
    const [isGet,setIsGet]=useState(true);
    const[isFirst,setIsFirst]=useState(true);
    

    
      useEffect(()=>{
       if(isFirst){setIsFirst(false); return}
       const calc2=JSON.parse(localStorage.getItem("calcStorage"))|| [];
       setCalc(calc2);


      },[isGet])
    
    
   
  
    const handleCalcGet=()=>{
      setIsGet(prev=>!prev)
    }

    const handleDailyPush = (newData) => {
        const daily = JSON.parse(localStorage.getItem("dailyData")) || [];
        localStorage.setItem("dailyData", JSON.stringify([...daily, newData]));
    };

    const handleDailyGet = (e) => {
        e.preventDefault();
        const daily = JSON.parse(localStorage.getItem("dailyData"));
   
        if (!daily) {
            console.log([]);
            return;
        }
        setData(daily);
        handleCalcGet();
    };

    const handleClear = (e) => {
        e.preventDefault();
        localStorage.removeItem("dailyData");
        setData([]);
        setCalc([]);
        localStorage.removeItem("calcStorage")
    };

    const handleCalcPush = (newCalcData) => {
      const calc2=JSON.parse(localStorage.getItem("calcStorage")) || [];
      const data2=[...calc2,newCalcData[newCalcData.length-1]]
      localStorage.setItem("calcStorage",JSON.stringify(data2));
        
    };

    return (
        <BussinessContext.Provider value={{ data, handleDailyPush, handleDailyGet, handleClear, handleCalcPush, calc }}>
            {children}
        </BussinessContext.Provider>
    );
};