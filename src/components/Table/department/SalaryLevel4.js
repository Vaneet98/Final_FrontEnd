import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../../Sidebar/SideBar"
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link,useNavigate  } from "react-router-dom";
import { toast } from "react-toastify"; 
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const SalaryLevel4 = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const navigate=useNavigate()
  const [show, setShow] = useState(false);
  const [isBlocked, setIsBlocked] = useState("");
  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("AppId");
  };
  // const handleShow = (AppId) => {
  //   setShow(true);
  //   localStorage.setItem("AppId", AppId);
  // };
  const getCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/department/getDepartmentSalarylevel4`
      );
      console.log(response);
      setCountries(response.data.data.user3.rows);
      setFiltercountries(response.data.data.user3.rows);
    } catch (error) {
      console.log(error);
    }
  };
  async function block(deptId){
    await fetch(`http://localhost:4002/department/block/${deptId}`,{
      method:"PUT"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        if(resq.data.status===200){
          toast.success("Department Blocked successfull",{position: toast.POSITION.TOP_CENTER});
          getCountries(); 
        }
        else{
          toast("Department UnBlocked successfull",{position: toast.POSITION.TOP_CENTER});
          getCountries(); 
        }
       
      })
    }) 
   }


  const colunms = [
    {
      name: (
        <h6>
          <b>DeptId</b>
        </h6>
      ),
      selector: (row) => row.deptId,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>DeptName</b>
        </h6>
      ),
      selector: (row) => row.DeptName,
      sortable: true,
    },
    
   
      {
        name: (
          <h6>
            <b>salaryType</b>
          </h6>
        ),
        selector: (row) => row.salaryType,
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
          <button  onClick={()=>navigate(`/editDepartment/${row.deptId} `)} style={{ border: "none" }}> 
            {" "}
            <i className="fa-solid fa-pen fa-lg"style={{color:"blue"}}></i>
          </button>

          <button onClick={ ()=>block(row.deptId)} style={{ border: "none" }}>
            {row.isBlocked?<i className="fa-sharp fa-solid fa-lock"style={{color:"green",fontSize:"20px"}}></i>:<i className="fa-solid fa-lock-open"style={{fontSize:"20px"}}></i> }
            </button>
        </div>
      ),
    },
  ];
  function handleSelect(e) {
    setIsBlocked(e.target.value);
  }
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.DeptName.toLowerCase().match(search.toLowerCase())||country.salaryType.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  const handleRowClicked = (row) => {
    navigate(`/departmentdetails/${row.deptId}`);
  };
  return (
    <><SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="Department"
        columns={colunms}
        data={filtercountries}
        pagination
        fixedHeader
        // fixedHeaderScrollHeight="500px"
        selectableRowsHighlight
        highlightOnHover
        subHeader
        onRowClicked={handleRowClicked}
        subHeaderComponent={
          <>
          <input
            type="text"
            placeholder="Search here"
            className="  form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <Form style={{ float: "left" }}>
                <Form.Label>Filter</Form.Label>
                <Form.Select
                  id="select"
                  name="isBlocked"
                  value={isBlocked}
                  onChange={handleSelect}
                >
                  <option value="">All</option>
                  <option value="1">Blocked</option>
                  <option value="0">Un-Blocked</option>
                </Form.Select>
              </Form> */}
          </>
        }
      />
      <Tooltip title="Add Department" style={{ float: "right" }}>
        <Fab color="#f6e58d" aria-label="add">
          <Link to="/addDepartment">
            <Add fontSize="large" />
          </Link>
        </Fab>
      </Tooltip>
     
    </div>
    </>
  );
};

export default SalaryLevel4;
