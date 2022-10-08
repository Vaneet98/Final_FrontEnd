import React,{useState,useEffect} from "react";
import axios from "axios";
import { Typography, Divider } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {useNavigate} from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart2() { 
  const [adminData, setAdminData] = useState([]);
  const navigate=useNavigate()
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/salary/gettotal"
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
      data: [adminData.Unblock,adminData.block,adminData.total],
      backgroundColor: ["#1B1464", "#009432","#ED4C67"],
      borderColor: ["rgba(255, 99, 132)", "rgba(255, 162, 235)","rgba(255, 205, 86)"],
      borderWidth: 1,
    },
  ], 
}
return (  
  <>
    <Doughnut data={Donutdata} 
    onClick={()=>navigate(`/Salary`)}/>

    <br />

  

    <span onClick={()=>navigate(`/SalaryUnblock`)}style={{ marginLeft: "1rem" }}><button style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i>Salary_ranges_Block </i></b></button>&nbsp;&nbsp;&nbsp;&nbsp;<b>{adminData.block}</b> </span>

    <span onClick={()=>navigate(`/SalaryBlock`)} style={{ marginLeft: "1rem" }}><button style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i>Salary_ranges_Unblock </i></b></button>&nbsp;&nbsp;&nbsp;&nbsp;<b>{adminData.Unblock}</b> </span>

    <Divider />

    <hr />

    <span onClick={()=>navigate(`/Salary`)} style={{ marginLeft: "5rem" }}> <button style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i> Total_Salary_ranges </i></b></button> &nbsp;&nbsp;&nbsp;&nbsp;<b>{adminData.total}</b>  </span>
  </>
);
}

export default DoughnutChart2; 
