import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// Toast
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

// Components
// import { FormRow } from "../../../components";
import SideBar from "../../components/Sidebar/SideBar";

// React Router
import { useNavigate } from "react-router-dom";

// API
import {
  getEducationQualification,
  getDepartment,
  getSalary,
  editEmployee,
} from "../../helper/EmployeeHelper/EmployeeApiCall";

const EditEmployee2 = () => {
  // navigate
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState({
    // email: localStorage.getItem("USER_EMAIL"),
    id: params.id,
    error: "",
    success: false,
  });
  console.log(userData.id);
  const [educationQualification, setEducationQualification] = useState([]);
  const [allocatedEducation, setAllocatedEducation] = useState([]);

  console.log("EDUCATION&&&&&&&&", allocatedEducation);

  const [department, setDepartment] = useState([]);
  const [allocatedDepartment, setAllocatedDepartment] = useState([]);

  console.log("DEPARTMENT&&&&&&&&", allocatedDepartment);

  const [salary, setSalary] = useState([]);
  const [allocatedSalary, setAllocatedSalary] = useState([]);

  console.log("SALARY&&&&&&&&", allocatedSalary);

  const { id } = userData;
  console.log("3333333333333333", id);
  async function save() {
    await fetch(`http://localhost:4002/user/editdelete/` + params.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        console.log("This is resq ", resq);
      });
    });
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (allocatedDepartment.length == 0) {
      return toast.error("Please Fill out all the Fields",{
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (allocatedEducation.length == 0) {
      return toast.error("Please Fill out all the Fields",{
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (allocatedSalary.length == 0) {
      return toast.error("Please Fill out all the Fields",{
        position: toast.POSITION.TOP_CENTER,
      });
    }
      save();
      allocatedDepartment.map(async (DeptName, index) => {
        console.log("LOOOOOOP", DeptName);
        await editEmployee({
          DeptName,
          id,
        }).then((data) => {
          console.log(data);
          if (data.data.status == 400) {
            // toast.error(data.data.message);
          } else if (data.data.status == 200) {
            // toast.success(data.data.message);
            console.log("DEPARTMENT ADDED&&&&&&&&&&&&&&&&&&&&&&&&");
          }
        });
      });
  
      allocatedEducation.map(async (eduName, index) => {
        console.log("LOOOOOOP", eduName);
        await editEmployee({
          id,
          eduName,
        }).then((data) => {
          console.log(data);
          if (data.data.status == 400) {
            // toast.error(data.data.message);
            setUserData({
              ...userData,
              error: data.data.message,
              success: false,
            });
          } else if (data.data.status == 200) {
            // toast.success(data.data.message);
            console.log("EDUCATION ADDED&&&&&&&&&&&&&&&&&&&&&&&&");
            setUserData({
              ...userData,
              success: true,
            });
          }
        });
      });
  
      allocatedSalary.map(async (salaryType, index) => {
        console.log("LOOOOOOP", salaryType);
        await editEmployee({
          salaryType,
          id,
        }).then((data) => {
          console.log(data);
          if (data.data.status == 400) {
            toast.error(data.data.message);
          } else if (data.data.status == 200) {
            toast.success("Edit Sucessfully");
            setTimeout(() => {
              navigate(`/employee`);
            }, 3000);
          }
        });
      });
    
  };

  const preload = () => {
    getEducationQualification().then((data) => {
      console.log(data);
      console.log(data.data.user);
      console.log(data.data.user.rows);
      if (data.data.status == 400) {
        toast.error(data.data.message);
        setEducationQualification({
          ...educationQualification,
          error: data.data.message,
          success: false,
        });
      } else {
        console.log(data.data.user.rows);

        setEducationQualification(data.data.user.rows);
      }
    });

    // Department API
    getDepartment().then((data) => {
      console.log(data);
      console.log(data.data.user);
      console.log(data.data.user.rows);
      if (data.data.status == 400) {
        toast.error(data.data.message);
        setDepartment({
          ...department,
          error: data.data.message,
          success: false,
        });
      } else {
        console.log(data.data.user.rows);

        setDepartment(data.data.user.rows);
      }
    });

    // SALARY API
    getSalary().then((data) => {
      console.log(data);
      console.log(data.data.user);
      console.log(data.data.user.rows);
      if (data.data.status == 400) {
        toast.error(data.data.message);
        setSalary({
          ...salary,
          error: data.data.message,
          success: false,
        });
      } else {
        console.log(data.data.user.rows);

        setSalary(data.data.user.rows);
      }
    });
  };

  console.log(educationQualification);
  console.log(department);
  console.log(salary);

  useEffect(() => {
    preload();
  }, []);

  //   FIXME: checkbox for TODO:EDUCATION
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...allocatedEducation];

    if (event.target.checked) {
      updatedList = [...allocatedEducation, event.target.value];
    } else {
      updatedList.splice(allocatedEducation.indexOf(event.target.value), 1);
    }
    setAllocatedEducation(updatedList);
  };

  const checkedItems = allocatedEducation.length
    ? allocatedEducation.reduce((total, item) => {
        // return total + ", " + item.eduName;
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked

  var isChecked = (item) =>
    allocatedEducation.includes(item) ? "checked-item" : "not-checked-item";

  //   FIXME: checkbox for TODO:DEPARTMENT
  const handleCheckDepartment = (event) => {
    var updatedListDepartment = [...allocatedDepartment];

    if (event.target.checked) {
      updatedListDepartment = [...allocatedDepartment, event.target.value];
    } else {
      updatedListDepartment.splice(
        allocatedDepartment.indexOf(event.target.value),
        1
      );
    }
    setAllocatedDepartment(updatedListDepartment);
  };

  const checkedItemsDepartment = allocatedDepartment.length
    ? allocatedDepartment.reduce((total, item) => {
        // return total + ", " + item.eduName;
        return "," + total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isCheckedDepartment = (item) =>
    allocatedDepartment.includes(item) ? "checked-item" : "not-checked-item";

  //   FIXME: checkbox for TODO:SALARY
  const handleCheckSalary = (event) => {
    var updatedListSalary = [...allocatedSalary];

    if (event.target.checked) {
      updatedListSalary = [...allocatedSalary, event.target.value];
    } else {
      updatedListSalary.splice(allocatedSalary.indexOf(event.target.value), 1);
    }
    setAllocatedSalary(updatedListSalary);
  };

  const checkedItemsSalary = allocatedSalary.length
    ? allocatedSalary.reduce((total, item) => {
        // return total + ", " + item.eduName;
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isCheckedSalary = (item) =>
    allocatedSalary.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <>
      <SideBar />
      <Container style={{ padding: "40px", marginLeft: "235px" }}>
        <form className="form1" onSubmit={handleSubmit}>
          <h3> Edit Employee</h3>
          <br />

          <div className="form-center">
            <div className="checkList">
              <h3
                className="title1"
               
              >
                Education Qualification
              </h3>
              <div className="list-container">
                

                {educationQualification.map((item, index) => {
                  console.log(item);
                  console.log(item.eduName);

                  return (
                    <div key={index}>
                      <input
                        value={item.eduName}
                        type="checkbox"
                        onChange={handleCheck}
                        name={item.eduName}
                      />
                      <span
                        className={isChecked(item)}
                        style={{ margin: "0px 10px" }}
                      >
                        {item.eduName}
                      </span>
                    </div>
                  );
                })}

                <div>{`Items checked are: ${checkedItems}`}</div>

                {/* TODO:DEPARTMENTS */}
                <h2 style={{ marginTop: "15px", marginBottom: "5px" }}>
                  Departments
                </h2>

                {department.map((item, index) => {
                  console.log(item);
                  // console.log(item.eduName);

                  return (
                    <div key={index}>
                      <input
                        value={item.DeptName}
                        type="checkbox"
                        onChange={handleCheckDepartment}
                        name={item.DeptName}
                      />
                      <span
                        className={isCheckedDepartment(item)}
                        style={{ margin: "0px 10px" }}
                      >
                        {item.DeptName}
                      </span>
                    </div>
                  );
                })}

                <div>{`Items checked are: ${checkedItemsDepartment}`}</div>

                {/* TODO:SALARY */}
                <h2 style={{ marginTop: "15px", marginBottom: "5px" }}>
                  Salary
                </h2>

                {salary.map((item, index) => {
                  console.log(item);
                  // console.log(item.eduName);

                  return (
                    <div key={index}>
                      <input
                        value={item.salaryType}
                        type="checkbox"
                        onChange={handleCheckSalary}
                        name={item.salaryType}
                      />
                      <span
                        className={isCheckedSalary(item)}
                        style={{ margin: "0px 10px" }}
                      >
                        {item.salaryType}
                      </span>
                    </div>
                  ); 
                })}

                <div>{`Items checked are: ${checkedItemsSalary}`}</div>
              </div>
            </div>

            {/* <div>{`Items checked are: ${checkedItems2}`}</div> */}

            <button
              type="submit"
              style={{backgroundColor:"blue", color:"white",fontSize:"20px",padding:"10px 40px",borderRadius:"30px"}}
              onClick={handleSubmit}
            >
              Save 
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default EditEmployee2;
