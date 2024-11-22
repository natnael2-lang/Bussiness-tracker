import React, { useContext, useEffect, useState } from 'react';
import { BussinessContext } from './BussinessContext';
import "../CSS/BussinessTable.css";

const BussinessTable = () => {
    const { data, handleDailyGet, handleClear, handleCalcPush } = useContext(BussinessContext);
    const [totalUnit, setTotalUnit] = useState(100);
    const [variableCost, setVariableCost] = useState(1000);
    const [fixedCost, setFixedCost] = useState(800);
    const [calculatedValues, setCalculatedValues] = useState([]);

    useEffect(() => {
        if (data.length === 0) return;

        const values = data.map((element, index) => {
            const revenue = data
                .slice(0, index + 1)
                .reduce((acc, ex) => acc + (ex.sellingPricePerUnit * ex.numberOfUnit), 0);
            const numberOfUnit = data
                .slice(0, index + 1)
                .reduce((acc, ex) => acc + ex.numberOfUnit, 0);
            const grossProfit = revenue - (numberOfUnit * (variableCost / totalUnit));
            const netProfit = revenue - (numberOfUnit * (variableCost / totalUnit)) - fixedCost;

            return { 
                date: element.date, 
                netProfit: netProfit,
                grossProfit: grossProfit,
                revenue: revenue,
                numberOfUnit: numberOfUnit 
            };
        });

        setCalculatedValues(values);
        handleCalcPush(values);
        
    }, [data, variableCost, fixedCost, totalUnit]); // Add dependencies

    return (
        <>
            <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
                <button onClick={handleDailyGet} style={{ padding: "0.6em 16px", border: "1px solid lightGrey", borderRadius: "4px", backgroundColor: "lightGreen" }}>Get Data</button>
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
                            { data.length>0 && data.map((element, index) => {
                                const calculatedValue = calculatedValues[index] || {}; // Safeguard against undefined
                                const remainingUnit = totalUnit - (calculatedValue.numberOfUnit );

                                return (
                                    <tr key={element.date}>
                                        <td>{element.date}</td>
                                        <td>{`${element.sellingPricePerUnit} ${element.unit}`}</td>
                                        <td>{element.numberOfUnit}</td>
                                        <td>{calculatedValue.numberOfUnit }</td>
                                        <td>{calculatedValue.revenue }</td>
                                        <td>{calculatedValue.grossProfit }</td>
                                        <td>{calculatedValue.netProfit }</td>
                                        <td>{remainingUnit}</td>
                                        <td>{((fixedCost + variableCost - (calculatedValue.revenue )) / 60) }</td>
                                        <td>
                                            <button style={{ padding: "0.6em 16px", border: "1px solid lightGrey", borderRadius: "4px", backgroundColor: "red" }}>X</button>
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