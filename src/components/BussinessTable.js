import React, { useContext, useEffect, useState } from 'react';
import { BussinessContext } from './BussinessContext';
import "../CSS/BussinessTable.css";

const BussinessTable = () => {
    const { data, handleDailyGet, handleClear, handleCalcPush, result, handleFixedPopup } = useContext(BussinessContext);
    const [totalUnit, setTotalUnit] = useState(0);
    const [variableCost, setVariableCost] = useState(0);
    const [fixedCost, setFixedCost] = useState(0);
    const [calculatedValues, setCalculatedValues] = useState([]);

    useEffect(() => {
        // Retrieve fixed costs from localStorage on component mount
        const storedValues = JSON.parse(localStorage.getItem("Fixed")) || {};
        setFixedCost(storedValues.fixedCost || 0);
        setVariableCost(storedValues.variableCost || 0);
        setTotalUnit(storedValues.totalUnit || 0);
    }, []);

    useEffect(() => {
        // Update state based on the result from the context
        if (result && Object.keys(result).length > 0) {
            setFixedCost(result.fixedCost || 0);
            setVariableCost(result.variableCost || 0);
            setTotalUnit(result.totalUnit || 0);
            // Ensure to also update localStorage whenever result changes
            localStorage.setItem("Fixed", JSON.stringify(result));
        }
    }, [result]);

    useEffect(() => {
        if (data.length === 0) return;

        const values = data.map((element, index) => {
            const revenue = data.slice(0, index + 1).reduce((acc, ex) => acc + (ex.sellingPricePerUnit * ex.numberOfUnit), 0);
            const numberOfUnit = data.slice(0, index + 1).reduce((acc, ex) => acc + ex.numberOfUnit, 0);
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
    }, [data, variableCost, fixedCost, totalUnit]);

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
                                const remainingUnit = totalUnit - (calculatedValue.numberOfUnit || 0);

                                return (
                                    <tr key={element.date}>
                                        <td>{element.date}</td>
                                        <td>{`${element.sellingPricePerUnit} ${element.unit}`}</td>
                                        <td>{element.numberOfUnit}</td>
                                        <td>{calculatedValue.numberOfUnit || 0}</td>
                                        <td>{calculatedValue.revenue || 0}</td>
                                        <td>{calculatedValue.grossProfit || 0}</td>
                                        <td>{calculatedValue.netProfit || 0}</td>
                                        <td>{remainingUnit}</td>
                                        <td>{((fixedCost + variableCost - (calculatedValue.revenue || 0)) / 60) || 0}</td>
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