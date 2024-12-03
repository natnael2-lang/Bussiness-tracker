import { createContext, useEffect, useState } from "react";

export const BussinessContext = createContext();

export const ContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [calc, setCalc] = useState([]);
    const [result, setResult] = useState({});
    const [isFixedPopup, setIsFixedPopup] = useState(false);

    useEffect(() => {
        // Update state based on the result from the context
        if (result && Object.keys(result).length > 0) {
            const storedValues = JSON.parse(localStorage.getItem("Fixed")) || [];
      

            // Ensure storedValues is an array
            if (Array.isArray(storedValues)) {
                localStorage.setItem("Fixed", JSON.stringify([...storedValues, result]));
                console.log("stored fixed",[...storedValues, result])
            } else {
                console.error("Expected storedValues to be an array, but it is not.");
                localStorage.setItem("Fixed", JSON.stringify([result])); // Fallback to array with result
            }
        }
    }, [result]);

    const handleFixedResult = (val) => {
        setResult(val);
    };

    const handleFixedPopup = () => {
        setIsFixedPopup(true);
    };

    const closeFixedPopup = () => {
        setIsFixedPopup(false);
    };

    const handleDailyPush = (newData) => {
        const daily = JSON.parse(localStorage.getItem("dailyData")) || [];
        localStorage.setItem("dailyData", JSON.stringify([...daily, newData]));
    };

    const handleDailyGet = (e) => {
        e.preventDefault();
        const daily = JSON.parse(localStorage.getItem("dailyData"));

        if (!daily) {
            
            return;
        }
        setData(daily);
    };

    const handleClear = (e) => {
        e.preventDefault();
        localStorage.removeItem("dailyData");
        localStorage.removeItem("Fixed");
        setData([]);
        setCalc([]);
    
       
       
    };

    const handleCalcPush = (newCalcData) => {
        setCalc(newCalcData);
    };
    const handleDelete=(ind)=>{
        const data2=data.filter((element,index)=>index !==ind)
        localStorage.setItem("dailyData", JSON.stringify([...data2]));
       const fixed= JSON.parse(localStorage.getItem("Fixed"));
       const fixed2=fixed.find(val=>val.startI ===ind) || [];
       const newD=fixed.filter((val)=>val.startI!==ind)
       if(fixed2 && fixed2.length>0){
        const fixedDoc=fixed[0];
        const i=(ind+1);
       
        if(i<fixed.length-1){
            const fixedDoc1={...fixedDoc,startI:i}
          
            localStorage.setItem("Fixed",JSON.stringify([...newD,fixedDoc1]))
            
        }
       else{localStorage.setItem("Fixed",JSON.stringify([...newD]))
       }
        
       }
       else{localStorage.setItem("Fixed",JSON.stringify([...newD]))}
        setData(data2)
       

    }

    return (
        <BussinessContext.Provider value={{ 
            data, 
            handleDailyPush, 
            handleDailyGet, 
            handleClear, 
            handleCalcPush, 
            calc, 
            isFixedPopup, 
            closeFixedPopup, 
            result, 
            handleFixedPopup, 
            handleFixedResult ,
            handleDelete
        }}>
            {children}
        </BussinessContext.Provider>
    );
};