import { Link } from "react-router-dom";
import "../CSS/Sider.css";
import { BussinessContext } from "./BussinessContext";
import { useContext,useState } from "react";
import { EthCalender } from "./EthCalender";
const Sider=()=>{
    const{handleFixedPopup,handleClear,returnVals,report}=useContext(BussinessContext);
    const[returns,setReturns]=useState([]);



    const getDailyData=()=>{
        const data=returnVals();
        const date=EthCalender(new Date());
        const weekNum=date.week;
        const monthNum=date.month
        const dailyData=data.filter((val)=>(val.date.week===weekNum && val.date.month===monthNum )) || [];
        console.log("datata",dailyData)
        report(dailyData)
        

    }

    function getLastObjectsByKey(array) {
        const result = new Map();
        
      
        array.forEach(obj => {
            const weekKey = obj.date.week;
            if (weekKey !== undefined) {
                
                result.set(weekKey, obj);
            }
        });
        
       
        return Array.from(result.values());
    }
    function getLastObjectsByKeyM(array) {
        const result = new Map();
        
      
        array.forEach(obj => {
            const monthKey = obj.date.month; 
            if (monthKey !== undefined) {
          
                result.set(monthKey, obj);
            }
        });
        
      
        return Array.from(result.values());
    }
    
    const getWeeklyData = () => {
        const data = returnVals();
        const date2 = EthCalender(new Date());
        const monthNum = date2.month;
        const weekNum = date2.week;
    
        const weeklyData = data.filter((val) => (val.date.month === monthNum && val.date.week === weekNum)) || [];
        
        
        const arr = getLastObjectsByKey(weeklyData);
  
        report(arr)
        
     
    }
    const getMonthlyData=()=>{
        const data=returnVals();
        const date=EthCalender(new Date());
        const thisYear=date.year;
        const monthlyData=data.filter((val)=>(val.date.year===thisYear)) || [];
        const arr = getLastObjectsByKeyM(monthlyData);
        
        report(arr)
    }





    return(
        <aside className="sider">
            <ul>
                <li><button onClick={getDailyData}>Daily report</button></li>
                <li><button onClick={getWeeklyData}>Weekly report</button></li>
               
                <li><button onClick={getMonthlyData}>Monthly report</button></li>
                <li> <button onClick={handleFixedPopup}>Fixed costs</button></li>
                <li><button >Get result</button></li>
                <li><button onClick={handleClear} style={{backgroundColor:"red"}}>Clear</button></li>
            </ul>
        </aside>
    )

}

export default Sider;