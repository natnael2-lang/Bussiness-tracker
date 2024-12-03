import React, { useContext, useEffect, useRef, useState } from 'react';
import { BussinessContext } from './BussinessContext';
import "../CSS/BussinessTable.css";

const BussinessTable = () => {
    const { data, handleDailyGet, handleClear, handleCalcPush,  handleFixedPopup,handleDelete,result } = useContext(BussinessContext);
   
    const [calculatedValues, setCalculatedValues] = useState([]);

  

    useEffect(() => {
        if (data.length === 0) return;
        console.log("data table",data)
    
        const storedValues = JSON.parse(localStorage.getItem("Fixed")) || [];
        console.log("in table",storedValues)
      
        var grossProfitP = 0;
        const values = data.map((element, index) => {
            // Find all matching fixed costs for the current index
           
            const matchingFixed = Array.isArray(storedValues)
                ? storedValues.filter(value => value.startI <= index)
                : [];
            
            // Get the last matching fixed cost entry, if any
            const lastMatchingFixed = matchingFixed[matchingFixed.length - 1];
    
            let currentFixedCost = 0;
            let currentVariableCost = 0;
            let currentTotalUnit = 0;
           
            // If a match is found, update current costs and units
            if (lastMatchingFixed) {
                currentFixedCost = lastMatchingFixed.fixedCost || 0;
                
                currentVariableCost = lastMatchingFixed.variableCost || 0;
               
                currentTotalUnit = lastMatchingFixed.totalUnit || 0;
            }
           
    
            const revenue = data.slice(0, index + 1).reduce((acc, ex) => acc + (ex.sellingPricePerUnit * ex.numberOfUnit), 0);
            const numberOfUnit = data.slice(0, index + 1).reduce((acc, ex) => acc + ex.numberOfUnit, 0);
    
            // Avoid division by zero
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
                breakEven
               
            };
        });
        console.log("values",values)
    
        setCalculatedValues(values);
        handleCalcPush(values);
    }, [data,result]);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
                <button onClick={handleFixedPopup} style={{ padding: "0.6em 16px", border: "1px solid lightGrey", borderRadius: "4px", backgroundColor: "lightGreen" }}>Fixed Costs</button>
                <button onClick={handleDailyGet} style={{ padding: "0.6em 16px", border: "1px solid lightGrey", borderRadius: "4px", backgroundColor: "lightGreen" }}>Get Result</button>
                <button onClick={handleClear} style={{ padding: "0.6em 16px", border: "1px solid lightGrey", borderRadius: "4px", backgroundColor: "red" }}>Clear</button>
            </div>

            {data.length > 0 && (
                <div className="table-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Selling Price Per Unit</th>
                                <th>Number Of Unit</th>
                                <th>Total Unit Sold</th>
                                <th>Revenue</th>
                                <th>Gross Profit</th>
                                <th>Net Profit</th>
                                <th>Remaining Unit</th>
                                <th>Break Even Point</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element, index) => {
        
                                const calculatedValue = calculatedValues[index] || {};
                               
                        
                                return (
                                    <tr key={index}>
                                        <td>{`${element.date.day}, ${element.date.month} ${element.date.ethDate}, ${element.date.time}`}</td>
                                        <td>{`${element.sellingPricePerUnit} ${element.unit}`}</td>
                                        <td>{element.numberOfUnit}</td>
                                        <td>{calculatedValue.numberOfUnit || 0}</td>
                                        <td>{calculatedValue.revenue || 0}</td>
                                        <td>{calculatedValue.grossProfit || 0}</td>
                                        <td>{calculatedValue.netProfit || 0}</td>
                                        <td>{calculatedValue.totalU-calculatedValue.numberOfUnit}</td>
                                        <td>{calculatedValue.breakEven<=0?"succeed":Math.ceil(calculatedValue.breakEven)}</td>
                                        <td>
                                            <button style={{ padding: "0.6em 16px", border: "1px solid lightGrey", borderRadius: "4px", backgroundColor: "red" }} onClick={()=>handleDelete(index)} >X</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default BussinessTable;
