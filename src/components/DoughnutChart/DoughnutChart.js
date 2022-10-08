import React,{useState,useEffect} from "react";
import axios from "axios";
import AppVersion from "../Table/AppVersion";
import { Typography, Divider } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {useNavigate} from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);
   
function DoughnutChart() { 
const navigate=useNavigate()
   const [adminData, setAdminData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/education/getalltablerecorde"
      );
      console.log("This is graph data::",response.data.data);
      setAdminData(response.data.data);
      console.log("This is admin data-----",adminData)
    } catch (error) {
      console.log(error);
    } 
  };
  useEffect(() => {
    getData();
  }, []); 
  const Donutdata = {
  datasets: [
    {
      label: "# of Votes",
      data: [adminData.BlockCount, adminData.UnblockCount ],
        backgroundColor: ["#3C3C3C", "#F47004"],
      borderColor: ["rgba(255, 99, 132)", "rgba(255, 162, 235)","rgba(255, 205, 86)"],
      borderWidth: 1,
    },
  ],  
}
return (  
  <>
    <Doughnut
      data={Donutdata}
      style={{ height: "250px !important", width: "250px !important" }}
      onClick={()=>navigate(`/Qualification`)}
      // onClick={()=><AppVersion/>}
    />
    <br />
    <span onClick={()=>navigate(`/QualificationBlock`)}style={{ marginLeft: "3rem" }}> <button style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i>Qulafication_Blocked </i></b></button>&nbsp;&nbsp;&nbsp;&nbsp;<b>{adminData.BlockCount}</b>  </span>
    <span onClick={()=>navigate(`/QualificationUnBlock`)}style={{ marginLeft: "3rem" }}><button style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i>Qualification_UnBlocked </i></b></button>&nbsp;&nbsp;&nbsp;&nbsp;<b>{adminData.UnblockCount}</b> </span>
    <Divider /> <hr style={{ color: "#0D0D0D" }} />
    <span onClick={()=>navigate(`/Qualification`)}style={{ marginLeft: "6rem" }}><button style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i>Total User </i></b></button>&nbsp;&nbsp;&nbsp;&nbsp; <b>{adminData.blockUnblockTotal}</b>  </span>
  </>
);
}    

export default DoughnutChart;
