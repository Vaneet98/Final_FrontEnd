import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// Axios
import axios from "axios";

// React Toastify
import { toast } from "react-toastify";

// React Router DOM
import { useNavigate, Link } from "react-router-dom";

// React Table
import DataTable from "react-data-table-component";





const Employee = () => {
  // use Navigate
  const navigate = useNavigate();

  // For Searching in Table
  const [search, setSearch] = useState("");

 




  const [isBlocked, setIsBlocked] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  console.log(isBlocked);

  // PAGINATION
  const paginationComponentOptions = {
    rangeSeparatorText: "Total",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };



  const preload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/user/userDetails`
      );
      console.log(response);
      setCountries(response.data.data.data);
      setFiltercountries(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("id");
  };
  const handleShow = (id) => {
    setShow(true);
    localStorage.setItem("id", id);
  };

  async function deleteUser(){
    let id = localStorage.getItem("id");
    await fetch(`http://localhost:4001/api/delete/${id}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        toast.success("User delete successfull",{position: toast.POSITION.TOP_CENTER});
        preload(); 
        handleClose();
      })
    }) 
   }

  useEffect(() => {
    preload();
  }, [isBlocked]);
  async function block(id){
    await fetch(`http://localhost:4002/user/block/${id}`,{
      method:"PUT"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        if(resq.data.status===200){
          toast.success("Employee Blocked successfull",{position: toast.POSITION.TOP_CENTER});
          preload(); 
        }
        else{
          toast("Employee UnBlocked successfull",{position: toast.POSITION.TOP_CENTER});
          preload(); 
        }
       
      })
    })     
   }

  // TABLE Structure
  const colunms = [
    {
      name: (
        <h5>
          <b>Emp_ID</b>
        </h5>
      ),
      selector: (row) => row.id,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Employee Name</b>
        </h5>
      ),
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Employee Email</b>
        </h5>
      ),
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Department Allocated-1</b>
        </h5>
      ),
      selector: (row) => row.employeeDepts[0]?.DeptName,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Department Allocated-2</b>
        </h5>
      ),
      selector: (row) => row.employeeDepts[1]?.DeptName,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Department Allocated-3</b>
        </h5>
      ),
      selector: (row) => row.employeeDepts[2]?.DeptName,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Education Qualification-1</b>
        </h5>
      ),
      selector: (row) => row.employeeDepts[0]?.employeeEdus[0]?.eduName,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Education Qualification-2</b>
        </h5>
      ),
      selector: (row) => row.employeeDepts[0]?.employeeEdus[1]?.eduName,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Education Qualification-3</b>
        </h5>
      ),
      selector: (row) => row.employeeDepts[0]?.employeeEdus[2]?.eduName,
      sortable: true,
    },

    {
      name: (
        <h5>
          <b>Salary Allocated</b>
        </h5>
      ),
      selector: (row) =>
        row.employeeDepts[0]?.employeeEdus[0]?.employeeSalaries[0]
          ?.salaryType ||
        row.employeeDepts[0]?.employeeEdus[0]?.employeeSalaries[1]
          ?.salaryType ||
        row.employeeDepts[0]?.employeeEdus[1]?.employeeSalaries[0]?.salaryType,
      //  row.employeeDepts[0]?.employeeEdus[0]?.eduName
      sortable: true,
    },

    {
      name: (
        <h6>
          <b>Action</b>
        </h6>
      ),
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "110px",
          }}
        >
          <button onClick={()=>navigate(`/edit/${row.id} `)} style={{ border: "none",backgroundColor:"white" }}>
            {" "}
            <i className="fa-solid fa-pen fa-lg"style={{color:"blue",backgroundColor:"white"}}></i>
          </button> 
          <button onClick={() => handleShow(row.id)} style={{ border: "none" }}> <i  className="fa-regular fa-trash-can fa-lg" style={{color:"red"}}></i></button>
          <button onClick={ ()=>block(row.id)} style={{ border: "none",backgroundColor:"white" }}>
            {row.Isblocked?<i className="fa-sharp fa-solid fa-lock"style={{color:"green",fontSize:"20px"}}></i>:<i className="fa-solid fa-lock-open"style={{fontSize:"20px"}}></i> }   
            </button>
        </div>
      ), 
    },
  ];
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase())||country.email.toLowerCase().match(search.toLowerCase())||country.employeeDepts[0]?.DeptName.toLowerCase().match(search.toLowerCase())||country.employeeDepts[1]?.DeptName.toLowerCase().match(search.toLowerCase())||country.employeeDepts[2]?.DeptName.toLowerCase().match(search.toLowerCase())||country.employeeDepts[0]?.employeeEdus[0]?.eduName.toLowerCase().match(search.toLowerCase())||country.employeeDepts[0]?.employeeEdus[1]?.eduName.toLowerCase().match(search.toLowerCase())||country.employeeDepts[0]?.employeeEdus[2]?.eduName.toLowerCase().match(search.toLowerCase())||country.employeeDepts[0]?.employeeEdus[0]?.employeeSalaries[0]
      ?.salaryType.toLowerCase().match(search.toLowerCase())|country.employeeDepts[0]?.employeeEdus[0]?.employeeSalaries[1]
      ?.salaryType.toLowerCase().match(search.toLowerCase())|country.employeeDepts[0]?.employeeEdus[1]?.employeeSalaries[0]
      ?.salaryType.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  // const viewIndividualResult = (row) => {
  //   navigate(`/ViewIndividualEducationPage/${row.eduId}`);
  // };

  // useEffect(() => {
  //   admin();

  // }, [isBlocked]);

  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px" }}>
        <DataTable
          title="Employee Table"
          columns={colunms}
          data={filtercountries}   
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
          // onRowClicked={viewIndividualResult}
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            
              <input
              type="text"
              placeholder="Search here"
              className="  form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // style={{
              //   marginRight: "500px",
              //   width: "200px",
              // }}
            />
             
          }
        />
           <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Important message</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={deleteUser}>
              Yes
            </Button>
          </Modal.Footer>
</Modal>
      </div>
    </>
  );
};

export default Employee;
