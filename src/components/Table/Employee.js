import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";

// Axios
import axios from "axios";

// React Toastify
import { toast } from "react-toastify";

// React Router DOM
import { useNavigate, Link } from "react-router-dom";

// React Table
import DataTable from "react-data-table-component";

// React Bootstrap
import Form from "react-bootstrap/Form";

var result;

const Employee = () => {
  // use Navigate
  const navigate = useNavigate();

  // For Searching in Table
  const [search, setSearch] = useState("");

  // For Storing API Response
  const [values, setValues] = useState({
    error: "",
    success: "false",
    data: [],
  });

  const [filterSearch, setFilterSearch] = useState({
    error: "",
    success: "false",
    data: [],
  });

  const [showModel, setShowModel] = useState(false);

  const [isBlocked, setIsBlocked] = useState("");

  console.log(isBlocked);

  // PAGINATION
  const paginationComponentOptions = {
    rangeSeparatorText: "Total",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  const isBlockDropDown = (e) => {
    setIsBlocked(e.target.value);
  };

  // TODO: API CALLS
  const preload = async () => {
    const data = await axios.get(`http://localhost:4002/user/userDetails`);

    console.log(data);
    console.log(data.data.data);
    console.log(data.data.data.data); /* Result we want */
    if (data.data.status == 400) {
      toast.error(data.data.message);
      setValues({ ...values, error: data.data.message, success: false });
    } else {
      setValues({ ...values, data: data.data.data.data });
      // setValues({ ...values, data: data.data.data.data });
      setFilterSearch({ ...filterSearch, data: data.data.data.data });
    }
  };

  // async function blockUser(eduId) {
  //   await fetch(`${API}blockUser/${eduId}`, {
  //     method: "POST",
  //   }).then((result) => {
  //     result.json().then((resq) => {
  //       console.log("blockinfo", resq);
  //       if (resq.data.status === "200") {
  //         toast.success(resq.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       } else if (resq.data.status === "201") {
  //         toast.success(resq.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       } else {
  //         toast(resq.data.message);
  //       }
  //       preload();
  //     });
  //   });
  // }

  useEffect(() => {
    preload();
  }, [search]);

  useEffect(() => {
    preload();
  }, [isBlocked]);

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

    // {
    //   name: (
    //     <h5>
    //       <b>Salary Allocated-2</b>
    //     </h5>
    //   ),
    //   selector: (row) =>
    //     row.employeeDepts[0]?.employeeEdus[1]?.employeeSalaries[0]?.salaryType,
    //   sortable: true,
    // },
  ];

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
          // data={result ? result : values.data}
          data={values.data}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
          // onRowClicked={viewIndividualResult}
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            <>
              {/* <input
              type="text"
              placeholder="Search here"
              className="  form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                marginRight: "500px",
                width: "200px",
              }}
            /> */}
              {/* <Form style={{ float: "left" }}>
                <Form.Label>Apply Filter</Form.Label>
                <Form.Select
                  id="select"
                  name="isBlocked"
                  value={isBlocked}
                  onChange={isBlockDropDown}
                >
                  <option value="">All</option>
                  <option value="1">Blocked</option>
                  <option value="0">Un-Blocked</option>
                </Form.Select>
              </Form> */}
            </>
          }
        />
      </div>
    </>
  );
};

export default Employee;
