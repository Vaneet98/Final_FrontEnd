import React from "react";
// import Axios from "../FetchAPI/Axios";
import ChartContiner from "../DoughnutChart/ChartContainer";
import ChartContiner1 from "../DoughnutChart/ChartContainer1";
// import AdminTable from "../Table/AdminTable";
import "./main-chart.css";
import SideBar from "../Sidebar/SideBar"
// import Faq from "../Table/Faq";
const Mainchart = () => {
  return (
    <div><SideBar/>
    <div
      className="container"
      style={{
        marginLeft: "235px",
        marginTop: "20px", 
        alignItems: "center",
        width: "1040px",
      }}
    >
      <div className="row">
        <div>
          <ChartContiner />
        </div>
        <div
          className="col"
          style={{ marginTop: "40px", marginLeft: "-100px" }}
        >
    
        </div>
        <div className="col d-md-flex" style={{ marginLeft: "-230px" }}>
          
          <div>
            {/* <Faq /> */}
          </div>
        </div>
        <div className="col d-md-flex" style={{ marginLeft: "200px" }}>
         
          {/* <ChartContiner1 /> */}
        </div>
      </div>
    </div>
    </div>
  );
};
export default Mainchart;
