import { useContext, useState } from "react";
import "../CSS/FixedCost.css"; 
import { BussinessContext } from "./BussinessContext";

const FixedCost = () => {
    const { isFixedPopup, closeFixedPopup, handleFixedResult } = useContext(BussinessContext);
    const [fixedCost, setFixedCost] = useState("");
    const [variableCost, setVariableCost] = useState("");
    const [totalUnit, setTotalUnit] = useState("");

    const handleFixedSubmit = (e) => {
        e.preventDefault();
        const daily = JSON.parse(localStorage.getItem("dailyData")) || [];
        const data = {
            fixedCost: Number(fixedCost),
            variableCost: Number(variableCost),
            totalUnit: Number(totalUnit),
            startI:daily.length ,
            
        };
        console.log("in fixed",data)
    
        handleFixedResult(data);
        setFixedCost("");
        setVariableCost("");
        setTotalUnit("");
    };

    return (
        isFixedPopup && (
            <div className="FixedOverlay">
                <form onSubmit={handleFixedSubmit}>
                    <div>
                        <label htmlFor="FixedCost">Fixed Cost:</label>
                        <input
                            value={fixedCost}
                            onChange={(e) => setFixedCost(e.target.value)}
                            id="FixedCost"
                            required
                            type="number"
                        />
                    </div>
                    <div>
                        <label htmlFor="VariableCost">Variable Cost:</label>
                        <input
                            value={variableCost}
                            onChange={(e) => setVariableCost(e.target.value)}
                            id="VariableCost"
                            required
                            type="number"
                        />
                    </div>
                    <div>
                        <label htmlFor="TotalProduction">Total Production Unit:</label>
                        <input
                            value={totalUnit}
                            onChange={(e) => setTotalUnit(e.target.value)}
                            required
                            id="TotalProduction"
                            type="number"
                        />
                    </div>
                    <button type="submit">Change</button>
                    <button type="button" onClick={closeFixedPopup}>X</button>
                </form>
            </div>
        )
    );
};

export default FixedCost;