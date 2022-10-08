import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import SideBar from "../components/Sidebar/SideBar"
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

const EditSalary = () => {
  const [salaryType, setSalaryType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  console.log(salaryType);
  console.log(minSalary);
  console.log(maxSalary);

  const navigate = useNavigate();
  const params = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    if (minSalary>maxSalary) {
      console.log("Please Enter the maxSalry more than minSalry");
      return toast.error("Please Enter the maxSalry more than minSalry");
    }
  }

  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/salary/getsalary/${params.salaryId}`,
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
      // salaryType,
      minSalary,
      maxSalary,
    };

    console.log("edit", item);
    await fetch("http://localhost:4002/salary/edit/"+ params.salaryId, {
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
            navigate("/Salary");
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
    <><SideBar/>
      <div className="titles">
        <Container style={{ width: "900px" }}>
          <div className="admin-main">
            <div>
              <Link to="/Salary">
                <AiOutlineLeft fa-lg />
              </Link>
              Edit Salary Range
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                {/* <Form.Label className="required-FIELD">Salary Type</Form.Label>
                <Form.Control
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
                  name="salaryType"
                  type="text"
                  placeholder={"Enter Salary Range"}
                /> */}

                <br />

                <Form.Label className="required-FIELD">Min Salary</Form.Label>
                <Form.Control
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  name="minSalary"
                  type="text"
                  placeholder={countries.minSalary}
                />

                <Form.Label className="required-FIELD">Max Salary</Form.Label>
                <Form.Control
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  name="maxSalary"
                  type="text"
                  placeholder={countries.maxSalary}
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

export default EditSalary;