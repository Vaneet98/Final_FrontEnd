import React, { useState, useEffect } from "react";

// Toast
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

// Components
// import { FormRow } from "../../../components";
import SideBar from "../../components/Sidebar/SideBar";

// CSS 
// import Wrapper from "../../../assets/wrappers/DashboardFormPage";

// React Router
import { useNavigate } from "react-router-dom";

// API
import {
  getEducationQualification,
  getDepartment,
  getSalary,
  addEmployee,
} from "../../helper/EmployeeHelper/EmployeeApiCall";

const AddEmployeePage2 = () => {
  // navigate
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    error: "",
    success: false,
  });

  const [educationQualification, setEducationQualification] = useState([]);
  const [allocatedEducation, setAllocatedEducation] = useState([]);



  const [department, setDepartment] = useState([]);
  const [allocatedDepartment, setAllocatedDepartment] = useState([]);

 

  const [salary, setSalary] = useState([]);
  const [allocatedSalary, setAllocatedSalary] = useState([]);
 
 

  const { email } = userData;

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);
    setUserData({ ...userData, error: false, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    allocatedDepartment.map(async (DeptName, index) => {
   
      await addEmployee({
        DeptName,
        email,
      }).then((data) => {
        console.log(data);
        if (data.data.status == 400) {
          // toast.error(data.data.message);
        } else if (data.data.status == 200) {
          // toast.success(data.data.message);
         
        }
      });
    });

    allocatedEducation.map(async (eduName, index) => {
      
      await addEmployee({
        email,
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
         
          setUserData({
            ...userData,
            success: true,
          });
        }
      });
    });

    allocatedSalary.map(async (salaryType, index) => {
      
      await addEmployee({
        salaryType,
        email,
      }).then((data) => {
        console.log(data);
        if (data.data.status == 400) {
          toast.error(data.data.message);
        } else if (data.data.status == 200) {
          toast.success(data.data.message);
          setTimeout(() => {
            navigate("/Employee");
          }, 2000);
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
       
        return total + ", " + item;
      })
    : "";



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
          <h3> Add Employee</h3>
          {/* EMAIL */}

          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
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

export default AddEmployeePage2;
