import { createContext, useEffect, useState } from "react";

export const BussinessContext = createContext();

export const ContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [calc, setCalc] = useState([]);
    const [result, setResult] = useState({});
    const [isFixedPopup, setIsFixedPopup] = useState(false);
    const[menu,setMenuSlide]=useState(false)

    useEffect(() => {
      
        if (result && Object.keys(result).length > 0) {
            const storedValues = JSON.parse(localStorage.getItem("Fixed")) || [];
      

           
            if (Array.isArray(storedValues)) {
                localStorage.setItem("Fixed", JSON.stringify([...storedValues, result]));
                console.log("stored fixed",[...storedValues, result])
            } else {
                console.error("Expected storedValues to be an array, but it is not.");
                localStorage.setItem("Fixed", JSON.stringify([result])); 
            }
        }
    }, [result]);
    useEffect(()=>{
        handleCalcPush(data)
    },[data])

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
        const daily = JSON.parse(localStorage.getItem("dailyData")) || [];
        const data2=daily.filter((element,index)=>index !==ind)
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
       setCalc(data2)

    }

    const report=(data)=>{
       
        setData(data)
        
    }

    const returnVals=()=>{
        const data2 = JSON.parse(localStorage.getItem("dailyData"));
       
        if (data2.length === 0) return [];
        console.log("data table",data)
    
        const storedValues = JSON.parse(localStorage.getItem("Fixed")) || [];
        console.log("in table",storedValues)
      
        var grossProfitP = 0;
        const values = data2.map((element, index) => {
            
           
            const matchingFixed = Array.isArray(storedValues)
                ? storedValues.filter(value => value.startI <= index)
                : [];
            
           
            const lastMatchingFixed = matchingFixed[matchingFixed.length - 1];
    
            let currentFixedCost = 0;
            let currentVariableCost = 0;
            let currentTotalUnit = 0;
           
            
            if (lastMatchingFixed) {
                currentFixedCost = lastMatchingFixed.fixedCost || 0;
                
                currentVariableCost = lastMatchingFixed.variableCost || 0;
               
                currentTotalUnit = lastMatchingFixed.totalUnit || 0;
            }
           
    
            const revenue = data2.slice(0, index + 1).reduce((acc, ex) => acc + (ex.sellingPricePerUnit * ex.numberOfUnit), 0);
            const numberOfUnit = data2.slice(0, index + 1).reduce((acc, ex) => acc + ex.numberOfUnit, 0);
    
            if (currentTotalUnit > 0) {
                grossProfitP += (element.numberOfUnit * (currentVariableCost / currentTotalUnit));
            }
    
            const grossProfit = revenue - (grossProfitP);
            const netProfit = revenue - grossProfitP - currentFixedCost;
            const newS=storedValues.filter((val,ind)=>val.startI<=index)
                                 
            const totalU=newS.reduce((acc, ex) => acc + ex.totalUnit, 0)
            const totalVariableCost=newS.reduce((acc, ex) => acc + ex.variableCost, 0)
           const breakEven=((currentFixedCost + totalVariableCost - (revenue || 0)) / 60) || 0
           
    
            return { 
                date: element.date, 
                netProfit,
                grossProfit,
                revenue,
                numberOfUnit,
                totalU,
                breakEven,
                indexCalc:index
               
            };
        });

        return values;
        
     }



    return (
        <BussinessContext.Provider value={{ 
            data, 
            handleDailyPush,  
            handleClear, 
            handleCalcPush, 
            calc, 
            isFixedPopup, 
            closeFixedPopup, 
           
            handleFixedPopup, 
            handleFixedResult ,
            handleDelete,
            returnVals,
            report,
            setMenuSlide,
            menu
        }}>
            {children}
        </BussinessContext.Provider>
    );
};