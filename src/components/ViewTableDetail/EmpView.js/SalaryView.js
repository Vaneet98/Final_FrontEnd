import React, { useState, useEffect } from "react";
import SideBar from "../../Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";

 
function SalaryView() {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [department1, setDeparment1] = useState([]);
  const [department2, setDeparment2] = useState([]);
  const [department3, setDeparment3] = useState([]);
  const [department4, setDeparment4] = useState([]);
  const [department5, setDeparment5] = useState([]);
  const [department6, setDeparment6] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4002/user/userDetails3/` + params.id);

      setUser(response.data.data.userInfo);
      console.log(response);
      console.log(user);

      console.log(response.data.data.userInfo);
      setDeparment1(response.data.data.userInfo[0].employeeSalaries[0].salaryType);

      console.log(response.data.data.userInfo[0].employeeSalaries[1].salaryType);
      setDeparment2(response.data.data.userInfo[0].employeeSalaries[1].salaryType);

      console.log(response.data.data.userInfo[0].employeeSalaries[2].salaryType);
      setDeparment3(response.data.data.userInfo[0].employeeSalaries[2].salaryType);

      console.log(response.data.data.userInfo[0].employeeSalaries[3].salaryType);
      setDeparment4(response.data.data.userInfo[0].employeeSalaries[3].salaryType);

      console.log(response.data.data.userInfo[0].employeeSalaries[4].salaryType);
      setDeparment5(response.data.data.userInfo[0].employeeSalaries[4].salaryType);

      console.log(response.data.data.userInfo[0].employeeSalaries[5].salaryType);
      setDeparment6(response.data.data.userInfo[0].employeeSalaries[5].salaryType);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <><SideBar/>
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <Card>
          <Card.Body>
            <div className="heading">
              <Link to="/Employee">
                <AiOutlineLeft /* fa-lg */ color="black" />
              </Link>
              <b><i>
              Employee Salary Details </i> </b>
            </div>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td><h5>Employee_id</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{user[0]?.id}</td>
                </tr>
                <tr>
                  <td><h5>Name</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{user[0]?.name}</td>
                </tr>

                <tr>
                  <td><h5>Email</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{user[0]?.email}</td>
                </tr>

                <tr>
                  <td><h5>Address</h5></td>
                  <td style={{ paddingLeft: "150px" }}>{user[0]?.address}</td>
                </tr>

                <br />
                <h5>Employee Salary Level</h5>

                <tr>
                  {/* <td>Department-1</td> */}
                  <td><b><i>{department1}</i></b></td>
                </tr>

                <tr>
                  {/* <td>Department-2</td> */}
                  <td><b><i>{department2}</i></b></td>
                </tr>

                <tr>
                  {/* <td>Department-3</td> */}
                  <td><b><i>{department3}</i></b></td>
                </tr>

                <tr>
                  {/* <td>Department-3</td> */}
                  <td><b><i>{department4}</i></b></td>
                </tr>

                <tr>
                  {/* <td>Department-3</td> */}
                  <td><b><i>{department5}</i></b></td>
                </tr>

                <tr>
                  {/* <td>Department-3</td> */}
                  <td><b><i>{department6}</i></b></td>
                </tr>

                {/* <tr>
                  <td>Created At</td>
                  <td style={{ paddingLeft: "150px" }}>{user.createdAt}</td>
                </tr> */}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SalaryView;