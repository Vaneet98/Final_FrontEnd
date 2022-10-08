import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "../components/Sidebar/SideBar"

const AchivementEdit = () => {
  const [eduName, setEduName] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", eduName);
  }

  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/education/get/${params.eduId}`,
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
      eduName,
    };
    console.log("edit", item);
    await fetch("http://localhost:4002/education/edit/" + params.eduId, {
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
            navigate("/Qualification");
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
              <Link to="/Qualification">
                <AiOutlineLeft fa-lg />
              </Link>
              Edit Education Qualification
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">Name</Form.Label>
                <Form.Control
                  value={eduName}
                  onChange={(e) => setEduName(e.target.value)}
                  name="eduName"
                  type="text"
                  placeholder={countries.eduName}
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

export default AchivementEdit;