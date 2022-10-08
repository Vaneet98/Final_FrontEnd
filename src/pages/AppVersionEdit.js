import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import SideBar from "../components/Sidebar/SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


const AppVersionEdit = () => {
  const [DeptName, setDeptName] = useState("");
  const [salaryType, setSalaryType] = useState("");
  console.log(DeptName);

  const navigate = useNavigate();
  const params = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", DeptName);
  }
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/department/get/${params.deptId}`,
      );
      console.log("############################33",response);    
      setCountries(response.data.data.user);
 
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {   
    getCountries();
  }, []);

  async function save() {
    let item = {
      DeptName,
      salaryType,
    };
    console.log("edit", item);
    await fetch("http://localhost:4002/department/edit/" + params.deptId, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        console.log("This is resq ", resq);
        if (resq.data.status === 400) {
          return toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (resq.statusCode === 200) {
          toast.success(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });

          setTimeout(() => {
            navigate("/Department");
          }, 2000);
        } else if (resq.data.status === "failed") {
          toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    });
  }

  return (
    <>    <SideBar />
      <div className="titles">
        <Container style={{ width: "900px" }}>
          <div className="admin-main">
            <div>
              <Link to="/Department">
                <AiOutlineLeft fa-lg />
              </Link>
              Edit Department
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">Name</Form.Label>
                <Form.Control
                  value={DeptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  name="DeptName"
                  type="text"
                  placeholder={countries.DeptName}
                />

                <br />

                <Form.Label className="required-FIELD">Salary Type</Form.Label>
                <Form.Control
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
                  name="salaryType"
                  type="text"
                  placeholder={countries.salaryType}
                />
              </Form.Group>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                  cursor: "pointer",
                }}
                type="submit"
                onClick={() => save()}
              >
                Save
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AppVersionEdit;