import React, { useState, useEffect } from "react";
import SideBar from "../../Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";


function OnclieckEmpDetail() {
    const params = useParams();

  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/user/list/" + params.id
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
    <><SideBar/>
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/Employee">
                <AiOutlineLeft /* fa-lg */ color="black" />
              </Link><b><i>
              Employee Basic details</i></b>
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td><h5>Employee ID</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{admin.id}</td>
                </tr>
                <tr>
                  <td><h5>Name</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{admin.name}</td>
                </tr>

                <tr>
                  <td><h5>Email</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{admin.email}</td>
                </tr>

                <tr>
                  <td><h5>Address</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{admin.address}</td>
                </tr>
                <tr>
                  <td><h5>DOB</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{admin.DOB}</td>
                </tr>
                <tr>
                  <td><h5>Date Of Joining</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{admin.DateOfJoining}</td>
                </tr>
                <br />
                
                <tr>
                  <td><h5>Created At</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{admin.createdAt}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default OnclieckEmpDetail;