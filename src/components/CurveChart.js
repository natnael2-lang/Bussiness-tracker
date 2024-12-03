import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BussinessContext } from './BussinessContext';
import "../CSS/CurveChart.css";

const CurveChart = () => {
    const { calc } = useContext(BussinessContext);
   

    return (
        <div className="chart-container">
            {calc && calc.length > 0 && (
                <>
                    <h2 className="chart-title">Sales Data Over Time</h2>
                    <LineChart width={600} height={300} data={calc}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="netProfit" stroke="#ff7300" isAnimationActive={false} />
                        <Line type="monotone" dataKey="grossProfit" stroke="green" isAnimationActive={false} />
                        <Line type="monotone" dataKey="revenue" stroke="blue" isAnimationActive={false} />
                      
                    </LineChart>
                </>
            )}
        </div>
    );
};

export default CurveChart;