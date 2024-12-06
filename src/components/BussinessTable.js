import React, { useContext, useEffect, useRef, useState } from 'react';
import { BussinessContext } from './BussinessContext';
import "../CSS/BussinessTable.css";
import CurveChart from './CurveChart';

const BussinessTable = () => {
    const { data, handleCalcPush,handleDelete} = useContext(BussinessContext);
   
    const [calculatedValues, setCalculatedValues] = useState([]);
    const[data2,setData2]=useState([]);

    useEffect(()=>{
        console.log("data in table",)
        const data2 = JSON.parse(localStorage.getItem("dailyData")) || [];
        setData2(data2)
        
    },[data])

  


     
    


     
    
        
       
    

    return (

            

           data&& data.length > 0 && (
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
                            { data.map((element, index) => {
                                
                                console.log("calc data",data);
                                const calcI=element.indexCalc
                                const calculatedValue = data2.filter((val,index)=>index==calcI) || {};
                                console.log("cacu value",calculatedValue);
                               
                        
                                return (
                                    calculatedValue && calculatedValue.length>0&&<tr key={index}>
                                        <td>{`${calculatedValue[0].date.day}, ${calculatedValue[0].date.month} ${calculatedValue[0].date.ethDate}, ${calculatedValue[0].date.time}, week ${calculatedValue[0].date.week}`}</td>
                                        <td>{`${calculatedValue[0].sellingPricePerUnit} ${calculatedValue[0].unit}`}</td>
                                        <td>{calculatedValue[0].numberOfUnit}</td>
                                        <td>{element.numberOfUnit || 0}</td>
                                        <td>{element.revenue || 0}</td>
                                        <td>{element.grossProfit || 0}</td>
                                        <td>{element.netProfit || 0}</td>
                                        <td>{element.totalU-element.numberOfUnit}</td>
                                        <td>{element.breakEven<=0?"succeed":Math.ceil(element.breakEven)}</td>
                                        <td>
                                            <button style={{ padding: "0.6em 16px", border: "1px solid lightGrey", borderRadius: "4px", backgroundColor: "red" }} onClick={()=>handleDelete(index)} >X</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <CurveChart/>
                </div>
            )
    
    );
};

export default BussinessTable;
