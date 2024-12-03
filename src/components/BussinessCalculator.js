import React, { useContext, useState } from "react";
import { BussinessContext } from "./BussinessContext";
import { EthCalender } from "./EthCalender";
import "../CSS/BussinessCalculator.css";

const BussinessCalculator = () => {
    const [sellingPricePerUnit, setSellingPricePerUnit] = useState("");
    const [numberOfUnit, setNumberOfUnit] = useState("");
    const [unit, setUnit] = useState("Birr");
    const { handleDailyPush, data } = useContext(BussinessContext);
    
    const submitData = (e) => {
        e.preventDefault();
        if (!sellingPricePerUnit || !numberOfUnit) { return; }

        let date = EthCalender(new Date());
        
        // Extracting properties to display
        const { time, day, month, date: ethDate } = date;

        let dataToSubmit = {
            date: {
                time,
                day,
                month,
                ethDate
            },
            sellingPricePerUnit: Number(sellingPricePerUnit),
            numberOfUnit: Number(numberOfUnit),
            unit
        };

        handleDailyPush(dataToSubmit);
        setSellingPricePerUnit("");
        setUnit("Birr");
        setNumberOfUnit("");
    };

    return (
        <div className="bussiness-calc-div">
            <form onSubmit={submitData} style={{ minWidth: "300px" }}>
                <div>
                    <label htmlFor="sellingPrice">Enter Selling Price/unit:</label>
                    <input 
                        value={sellingPricePerUnit} 
                        onChange={(e) => setSellingPricePerUnit(e.target.value)} 
                        type="number" 
                        id="sellingPrice" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="numberOfUnit">Number Of Unit:</label>
                    <input 
                        value={numberOfUnit} 
                        type="number" 
                        id="numberOfUnit"  
                        onChange={(e) => setNumberOfUnit(e.target.value)} 
                        required 
                    />
                    <select 
                        value={unit} 
                        style={{ height: "100%", border: "1px solid lightGrey", borderRadius: "4px", outline: "none" }} 
                        onChange={(e) => setUnit(e.target.value)} 
                        required
                    >
                        <option value="Birr">Birr</option>
                        <option value="$">$</option>
                    </select>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
           
        </div>
    );
};

export default BussinessCalculator;