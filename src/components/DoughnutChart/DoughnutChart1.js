import React,{useState,useEffect} from "react";
import axios from "axios";
import { Typography, Divider } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {useNavigate} from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);



function DoughnutChart1() { 
  const [adminData, setAdminData] = useState([]);
   const navigate=useNavigate()
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/department/getDepartmentSalary"
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
      data: [adminData.countBySalaryLevel1,adminData.countBySalaryLevel2,adminData.countBySalaryLevel3],
      backgroundColor: ["#B53471", "#00FF00", "#0000FF" ],
      borderColor: ["rgba(255, 99, 132)", "rgba(255, 162, 235)","rgba(255, 205, 86)"],
      borderWidth: 1,
    },
  ], 
}
return (
  <>
    <Doughnut data={Donutdata}
    onClick={()=>navigate(`/Department`)} />
    <br />
    <span onClick={()=>navigate(`/SalaryLevel1`)}   style={{ marginLeft: "1rem" }}> <button style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i>Salary Level1 for Department </i></b></button>&nbsp;&nbsp;&nbsp;&nbsp;<b>{adminData.countBySalaryLevel1}</b></span>
    <span onClick={()=>navigate(`/SalaryLevel2`)}   style={{ marginLeft: "1rem" }}><button style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i>Salary Level2 for Department </i></b></button>&nbsp;&nbsp;&nbsp;&nbsp;<b>{adminData.countBySalaryLevel2}</b> </span>
    <span  onClick={()=>navigate(`/SalaryLevel3`)}  style={{ marginLeft: "1rem" }}><button style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i>Salary Level3 for Department </i></b></button>&nbsp;&nbsp;&nbsp;&nbsp;<b>{adminData.countBySalaryLevel3}</b> </span>
    <Divider />
    <hr />
    <span style={{ marginLeft: "6rem" }}>
    <button onClick={()=>navigate(`/Department`)} style={{border:"none",textDecoration:"none",backgroundColor:"white"}}><b><i>Total </i></b></button>&nbsp;&nbsp;&nbsp;&nbsp; <b>{adminData.total}</b>
    </span>
  </> 
);
}

export default DoughnutChart1;
