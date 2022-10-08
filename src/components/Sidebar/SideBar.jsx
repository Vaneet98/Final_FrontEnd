import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaBars, FaHome,  FaBell, FaUserGraduate,FaUsers } from "react-icons/fa";
import {FcDepartment,FcMoneyTransfer} from "react-icons/fc";
import { MdCastForEducation } from "react-icons/md";

import { useState } from "react";
import { toast } from "react-toastify";
import Search from "@material-ui/icons/Search";
import { VscMail } from "react-icons/vsc";

import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";
import SidebarMenu from "./SidebarMenu";
import applify from "./Applify.jpeg";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },

  {
    path: "/Qualification",
    name: "Qualification",
    icon: <MdCastForEducation />,
  },

  {
    path: "/Department",
    name: "Department",
    icon: <FcDepartment />,
  },

  {
    path: "/Salary",
    name: "Salary",
    icon: <FcMoneyTransfer />,
  },

  {
    path: "/Employee",
    name: "Employee",
    icon: <FaUsers />,
  },
  
  {
    path: "/addEmployee",
    name: "Add Employee",
    icon: <FaUsers />,
  }
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  // const showAnimation = {
  //   hidden: {
  //     width: 0,
  //     opacity: 0,
  //     transition: {
  //       duration: 0.5,
  //     },
  //   },
  //   show: {
  //     opacity: 1,
  //     width: "auto",
  //     transition: {
  //       duration: 0.5,
  //     },
  //   },
  // };

  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("jwt"));
  console.log("User details", user);
  const userimage = user.data.userdetails.image;

  function LogOut() {
    localStorage.clear();

    toast.success("LogOut Succesfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate("/");
  }
  function gotoProfile() {
    navigate("/profile");
  }

  return (
    <>
      <nav className="main-div navbar-static-top">
        <div className="container-fluid topbarLeft">
          <div className="bars" style={{ cursor: "pointer", color: "white" }}>
            <FaBars onClick={toggle} />
          </div>
          <div className="logos">
            <img
              src={applify}
              alt=""
              style={{ width: "140px", marginLeft: "135px" }}
            />
          </div>
        </div>

        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input placeholder="Search...." className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <VscMail color="white" />
            </div>
            <div className="topbarIconItem">
              <FaBell color="white" />
            </div>
            {/* <div className="topbarIconItem">
              <img
                src={`http://localhost:4001/${userimage}`}
                alt=""
                className="topbarImg"
              />
            </div> */}
            <Nav>
              
              <NavDropdown id="nav-dropdown" title={user.data.userdetails.name} style={{ fontSize: "20px" }}>
                {/* <NavDropdown.Item onClick={gotoProfile}>
                  Profile
                </NavDropdown.Item> */}
                <NavDropdown.Item onClick={LogOut}>LogOut</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </div>
      </nav>

      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "225px" : "85px",

            transition: {
              duration: 0.1,
              type: "spring",
              damping: 5,
            },
          }}
          className={`sidebar `}
        >
          <section className="routes" style={{ marginLeft: "10px" }}>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    // showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        // variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
