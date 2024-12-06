import React, { useContext } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar, ResponsiveContainer
} from 'recharts';
import { BussinessContext } from './BussinessContext';
import "../CSS/CurveChart.css";

const CurveChart = () => {
    const { calc } = useContext(BussinessContext);

    return (
        <div className="chart-container">
            {calc && calc.length > 0 && (
                <>
                    <h2 className="chart-title">Sales Data Over Time</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={calc}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="netProfit" stroke="#ff7300" isAnimationActive={false} />
                            <Line type="monotone" dataKey="grossProfit" stroke="green" isAnimationActive={false} />
                            <Line type="monotone" dataKey="revenue" stroke="blue" isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>

                    <h2 className="chart-title">Sales Bar Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={calc}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="netProfit" fill="#ff7300" />
                            <Bar dataKey="grossProfit" fill="green" />
                            <Bar dataKey="revenue" fill="blue" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};

export default CurveChart;