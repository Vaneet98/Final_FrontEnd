import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar"
import { toast } from "react-toastify";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link ,useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "./Applify.jpeg";
import Form from "react-bootstrap/Form";
const Category = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [show, setShow] = useState(false);
  const [isBlocked, setIsBlocked] = useState("");
const navigate=useNavigate()
  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("cId");
  };
  const handleShow = (cId) => {
    setShow(true);
    localStorage.setItem("cId", cId);
  };
  const getCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/salary/list?limit=100&skip=0&isBlocked=${isBlocked}`
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  async function block(salaryId){
    await fetch(`http://localhost:4002/salary/block/${salaryId}`,{
      method:"PUT"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        if(resq.data.status===200){
          toast.success("Salary Blocked successfull",{position: toast.POSITION.TOP_CENTER});
          getCountries(); 
        }
        else{
          toast("Salary UnBlocked successfull",{position: toast.POSITION.TOP_CENTER});
          getCountries(); 
        }
       
      })
    }) 
   }

  //  async function deleteCatagory(){
  //   let cId = localStorage.getItem("cId");
  //   await fetch(`http://localhost:4001/category/deleteCategory/${cId}`,{
  //     method:"DELETE"
  //   }).then((result)=>{
  //     result.json().then((resq)=>{
  //       console.log("This is user request ",resq);
  //       toast.success("Category delete successfull",{position: toast.POSITION.TOP_CENTER});
  //       getCountries(); 
  //       handleClose();
  //     })
  //   }) 
  //  }
  const colunms = [
    {
      name: (
        <h6>
          <b>Serial No</b>
        </h6>
      ),
      selector: (row) => row.salaryId,
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
          <b>minSalary</b>
        </h6>
      ),
      selector: (row) => row.minSalary,
      sortable: true,
    },{
      name: (
        <h6>
          <b>maxSalary</b>
        </h6>
      ),
      selector: (row) => row.maxSalary,
      sortable: true,
    },
    {
        name: (
          <h6>
            <b>CreatedAt</b>
          </h6>
        ),
        selector: (row) => row.createdAt,
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
          <button onClick={()=>navigate(`/edit/${row.salaryId} `)} style={{ border: "none" }}>
            {" "}
            <i className="fa-solid fa-pen fa-lg"style={{color:"blue"}}></i>
          </button> 
          <button onClick={ ()=>block(row.salaryId)} style={{ border: "none" }}>
            {row.isBlocked?<i className="fa-sharp fa-solid fa-lock"style={{color:"green"}}></i>:<i className="fa-solid fa-lock-open"></i> }
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
  }, [isBlocked]);
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.salaryType.toLowerCase().match(search.toLowerCase())||country.minSalary.toLowerCase().match(search.toLowerCase())||country.maxSalary.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  const handleRowClicked = (row) => {
    navigate(`/salarydetail/${row.salaryId}`);
  };
  return (
    <><SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="Salary Details"
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
          <Form style={{ float: "left" }}>
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
              </Form>
          </>
        }
      />
       <Tooltip title="Add Salary" style={{ float: "right" }}>
        <Fab color="#f6e58d" aria-label="add">
          <Link to="/addCategory">
            <Add fontSize="large" />
          </Link>
        </Fab>
      </Tooltip>
      {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Important message</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={deleteCatagory}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal> */}
    </div>
    </>
  );
};

export default Category;
