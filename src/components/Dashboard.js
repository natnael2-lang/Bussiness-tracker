import "../CSS/Dashboard.css";
import Sider from "./Sider";
import BussinessTable from "./BussinessTable";
import BussinessCalculator from "./BussinessCalculator";
const Dashboard=()=>{
  
    return(
    <div className="dashboard-container">
        <Sider/>
        <BussinessCalculator/>
        <BussinessTable/>

    </div>
    
    )

}
export default Dashboard;