import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";

import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "../components/Sidebar/SideBar"


const AddCategory = () => {
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [salaryType, setSalaryType] = useState("");
  

  const navigate = useNavigate();
  const params = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    if (minSalary>maxSalary) {
      console.log("Please Enter the maxSalry more than minSalry");
      return toast.error("Please Enter the maxSalry more than minSalry");
    }
    
  }
 
  async function save() {
    let item = {
      minSalary,
      salaryType,
      maxSalary
    };
    console.log("edit", item);
    await fetch("http://localhost:4002/salary/add", {
      method: "POST",
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
            navigate("/Salary");
          }, 2000);
        } else if (resq.data.status === "failed") {
          toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        else if (resq.data.status === 201) {
          toast.error(resq.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    });
  }

  return (
    <><SideBar/>
      <div className="titles">
        <Container style={{ width: "900px" }}>
          <div className="admin-main">
            <div>
              <Link to="/Salary">
                <AiOutlineLeft fa-lg />
              </Link>
              Add New Salary
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >

                <Form.Label className="required-FIELD">Salary Type</Form.Label>
                <Form.Control
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
                  name="salaryType"
                  type="text"
                  placeholder={"Enter Salary Type"}
                /><br />
                <Form.Label className="required-FIELD">Minimun Salary</Form.Label>
                <Form.Control
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  name="DeptName"
                  type="text"
                  placeholder={"Enter minimum salary"}
                /><br />

                <Form.Label className="required-FIELD">Maximum Salary</Form.Label>
                <Form.Control
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  name="DeptName"
                  type="text"
                  placeholder={"Enter maximum salary"}
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

export default AddCategory;