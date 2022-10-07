import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import logo from "./logo.png";
import { toast } from "react-toastify";
import { authenticate } from "../../helper/ApiCall.js";
import { useCookies } from "react-cookie";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
  });

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      toast.warning("You are logged In", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/dashboard");
    }
  }, []);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}-${value}`);
    setCookie("email", email, { path: "/" });
    setCookie("password", password, { path: "/" });
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormErrors(Validate(values));
    if (!email || !password) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }
  };

  const { email, password } = values;
  async function signup() {
    console.log(password, email);
    let item = { email, password };
    console.log(item);
    let result = await fetch("http://localhost:4002/admin/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    if (result) {
      // console.log("Result",result.data.token)
      // console.log("Result1",result.data.status)
      if (result.data.status === "failed") {
        toast.error("Email or password is not valid", {
          position: toast.POSITION.TOP_CENTER,
        });
        setValues({ ...values, error: result.data.message, success: false });
      } else if (result.data.status === "Success") {
        authenticate(result, () => {
          setValues({
            ...values,
            success: true,
            isMember: false,
          });
          console.log("THIS IS DATA", result);
          toast.success("logged In Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });

          setTimeout(() => {
            navigate("/welcome");
          }, 2000);
        });
      } else if (result.data.status === 404) {
        toast.error(result.data.message);
      }
    }

    console.log(result);
  }

  



  const [cookies, setCookie] = useCookies(["user"]);

  const handle = () => {
    setCookie("email", email, { path: "/" });
    setCookie("password", password, { path: "/" });
  };

  const emailed= cookies.email;
  console.log("This is sidevbar cookies check",emailed)
  return (
    <Container
      id="container"
      className="d-grid"
     
    >
      <Form id="login-form" className=" w-100 mt-0" onSubmit={handleSubmit}>
        <div id="header">
          <img className="logo" src={logo} alt="" />
          <h5
            className="fs-3 fw-normal text-muted"
            
          >
            We love creative Business Ideas
          </h5>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >
            Email address
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={handleChange}
            // onChange={handle}
            name="email"
            // value={
            //   cookies.email ? (values.email = cookies.email) : values.email
            // }
            value={values.email}
          />
          <p style={{ color: "red", fontWeight: "bold" }}>{formErrors.email}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label >Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            // onChange={handle}
            type="password"
            placeholder="Password"
            name="password"
            // value={
            //   cookies.password
            //     ? (values.password = cookies.password)
            //     : values.password
            // }
            value={values.password}
          />
          <p style={{ color: "red", fontWeight: "bold" }}>
            {formErrors.password}
          </p>
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
        <div className="form-group row">
          <div className="col">
            <input
              type="checkbox"
              onChange={handleChange}  
              name="checkbox"
              // checked={cookies.email?"true" : "false"}     
             value={cookies.email?values.checked:values.checkbox}
              // onClick={handle}
            />
            <label htmlFor="" >
              Remember Me
            </label>
          </div>
          
          <div className="col">
            <Link to="/forgetPwd">
              <p id="para" >
                Forgot password?
              </p>
            </Link>
          </div>
        </div>
        {/* </Form.Group> */}

        <button
          id="btn"
          
          onClick={signup}
        >
          Login
        </button>
        <br />
        <br />
        <div className="col">
            <Link to="/registration">
              <p id="para1"style={{color:"blue"}}>
               Registration
              </p>
            </Link>
          </div>
      </Form>
    </Container>
  );
}

export default Login;
