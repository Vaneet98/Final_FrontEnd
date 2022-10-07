import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";


function Appview() {
  const params = useParams();
  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/department/get/" + params.deptId
      );
      console.log("Admiiinview",response)
      setAdmin(response.data.data.user);

    } catch (error) {
      console.log(error); 
    }
  }; 
  useEffect(() => { 
    getAdmin();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px"}}>
        <Card style={{backgroundColor:"#ecf0f1"}}>
          <Card.Body>
            <div className="heading" style={{marginBottom:"10px"}}>
              <Link to="/Department" style={{marginRight:"10px"}}>
                <AiOutlineLeft fa-lg color="black" />
              </Link>
             <b><u>Department Details</u></b> 
            </div>
            <Table borderless> 
              <tbody>
                <tr>
                  <td><b>deptId</b></td>
                  <td><h6>{admin.deptId}</h6></td>
                </tr>
                
                <tr>
                  <td><b>DeptName</b></td>
                  <td><h6>{admin.DeptName}</h6></td>
                </tr>
                <tr>
                  <td><b>salaryType</b></td>
                  <td><h6>{admin.salaryType}</h6></td>
                </tr>
                <tr>
                  <td><b>Created At</b></td>
                  <td><h6>{admin.createdAt}</h6></td>
                </tr>
                <tr>
                  <td><b>Updated At</b></td>
                  <td><h6>{admin.updatedAt}</h6></td>
                </tr>
              </tbody>
              </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Appview;