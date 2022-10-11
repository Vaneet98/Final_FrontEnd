import React, { useState,useEffect } from "react";
import axios from "axios"
// Toast
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

import SideBar from "../../components/Sidebar/SideBar";

// React Router
import { useNavigate, useParams } from "react-router-dom";

// API
import { editEmployee } from "../../helper/EmployeeHelper/EmployeeApiCall";
import Form from "react-bootstrap/Form";
const EditEmployee1 = () => {
  // navigate
  const navigate = useNavigate();
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

  const [userData, setUserData] = useState({
    id: params.id,
    email: "",
    name: "",
    DOB: "",
    DateOfJoining: "",
    gender: "",
    address: "",
    error: "",
    success: false,
  });

  const { email, name, DOB, DateOfJoining, gender, address } = userData;

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);
    setUserData({ ...userData, error: false, [name]: value });
  };
  localStorage.setItem("USER_EMAIL", email);
  console.log("555555555555555********", email);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id, email, name, DOB, DateOfJoining, gender, address } = userData;
    if ((!email, !name, !DOB, !DateOfJoining, !gender || !address)) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }

    editEmployee({ id, email, name, DOB, DateOfJoining, gender, address }).then(
      (data) => {
        console.log(data);
        if (data.data.status == 400) {
          toast.error(data.data.message);
          setUserData({
            ...userData,
            error: data.data.message,
            success: false,
          });
        } else if (data.data.status == 200) {
          setUserData({
            ...userData,
            success: true,
          });
          toast.success(data.data.message);

          setTimeout(() => {
            navigate(`/useredit2/${id}`);
          }, 3000);
        }
      }
    );
  };

  return (
    // <Wrapper>
    <>
      <SideBar />
      <Container style={{ width: "85%", marginLeft: "250px" }}>
        <form className="form" onSubmit={handleSubmit}>
          <h3> Edit Employee</h3>
          <div className="form-center">
            {/* NAME */}
            <label>Name</label>
            <br />
            <br />
            <input
              type="text"
              name="name"
              placeholder={admin.name}
              value={userData.name}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "}
            <br />
            <br />
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder={admin.email}
              value={userData.email}
              onChange={handleChange}
              style={{ width: "70%" }}
            />
            <br />
            <br />
            <label>DOB</label>
            <br />
            <input
              type="date"
              name="DOB"
              placholder={admin.DOB}
              value={userData.DOB}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "}
            <br />
            <br />
            <label>Date Of Joining</label>
            <br />
            <input
              type="date"
              name="DateOfJoining"
              placeholder={admin.DateOfJoining}
              value={userData.DateOfJoining}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "}
            <br />
            <br />
            {/* c
            <br />
          
            <input
              type="text"
              name="gender"
              placeholder={admin.gender}
              value={userData.gender}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "} */}
            <label>Gender</label>
            <Form>
              <Form.Select
                id="gender"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                style={{width:"20%"}}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form>
            <br />
            <br />
            <label>Address</label>
            <br />
            <input
              type="text"
              name="address"
              placeholder={admin.address}
              value={userData.address}
              onChange={handleChange}
              style={{ width: "70%" }}
            />{" "}
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-block changes"
              onClick={handleSubmit}
              style={{
                backgroundColor: "black",
                fontSize: "20px",
                color: "#ffffff",
                width: "70%",
              }}
            >
              Save and Continue
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default EditEmployee1;
