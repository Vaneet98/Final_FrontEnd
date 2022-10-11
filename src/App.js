import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Dashboard from "./pages/Dashboard";
import Mainchart from "./components/Charts/Mainchart";
import Category from "./components/Table/Category";
import AppVersion from "./components/Table/AppVersion";

import AdminAchivement from "./components/Table/AdminAchivement";

import Formlogin from "./components/loginnnnn/Login";
import ForgetPwd from "./components/loginnnnn/ForgetPwd";

import UserEdit from "./pages/UserEdit";
import Protected from "./components/Protected/Protected";
import Registration from "./components/loginnnnn/Registration";
import AddUser from "./pages/AddUser";
import SideBar from "./components/Sidebar/SideBar"
import ProfilePwd from "./components/Proffile/ProfilePwd";
import AddAppVersion from "./pages/AddAppVersion";
import AppVersionEdit from "./pages/AppVersionEdit";
import SetPassword from "./pages/SetPassword";
import userTable from "./components/Table/UserTable"

import AddAchivement from "./pages/AddAchivement";
import AchivementEdit from "./pages/AchivementEdit";
import AddCategory from "./pages/AddCatagory";


import Userview from "./components/ViewTableDetail/Userview";

import Categoryview from "./components/ViewTableDetail/Categoryview";
import Appview from "./components/ViewTableDetail/Appview";
import AdminAchivementview from "./components/ViewTableDetail/AdminAchivementview";

import Welcome from "./components/assests/Welcome";
import EditSalary from "./pages/EditSalary";



import AddEmployeePage from "./pages/Employee/AddEmployeePage";
import AddEmployeePage2 from "./pages/Employee/AddEmployeePage2";

import Employee from "./components/Table/Employee";
import SalaryBlock from "./components/Table/Salary/SalaryBlock";
import SalaryUnblock from "./components/Table/Salary/SalaryUnblock";
import SalaryLevel1 from "./components/Table/department/SalaryLevel1";
import SalaryLevel2 from "./components/Table/department/SalaryLevel2";
import SalaryLevel4 from "./components/Table/department/SalaryLevel4";
import SalaryLevel5 from "./components/Table/department/SalaryLevel5";
import SalaryLevel3 from "./components/Table/department/SalaryLevel3";
import Block from "./components/Table/Qualifiaction/Block";
import Unblock from "./components/Table/Qualifiaction/Unblock";
import EduView from "./components/ViewTableDetail/EmpView.js/EduView";
import OnclieckEmpDetail from "./components/ViewTableDetail/EmpView.js/OnclieckEmpDetail";
import SalaryView from "./components/ViewTableDetail/EmpView.js/SalaryView";
// import { editEmployee } from "./helper/EmployeeHelper/EmployeeApiCall";
import EditEmployee2 from "./pages/EditEmployee/EditEmployee2";
import EditEmployee1 from "./pages/EditEmployee/EditEmployee1";
//  import { useCookies } from "react-cookie";
function App() {
  // const [cookies, setCookie] = useCookies(["user"]);
  // var usersss=cookies.email;
  // console.log("This is sidebar ciikiiikk i",usersss)
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Formlogin/>}/>
          <Route path="/forgetPwd" element={<ForgetPwd/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/reset/:token/:id" element={<SetPassword/>}/>

          <Route path="/dashboard" element={<Protected Cmp={Mainchart}/>} />
          <Route path="/Qualification" element={<Protected Cmp= {AdminAchivement} />}/>
          <Route path="/Department" element={<Protected Cmp= {AppVersion} />} />
          <Route path="/Salary" element={<Protected Cmp= {Category} />} />





          <Route path="/addEducation" element={<Protected Cmp= {AddAchivement} />} />
          <Route path="/addDepartment" element={<Protected Cmp= {AddAppVersion} />} />     
          <Route path="/addCategory" element={<Protected Cmp= {AddCategory} />} />





          <Route path="/editDepartment/:deptId" element={<Protected Cmp= {AppVersionEdit} />} />
          <Route path="/editEducation/:eduId" element={<Protected Cmp= {AchivementEdit} />} />
          <Route path="/edit/:salaryId" element={<Protected Cmp= {EditSalary} />} />
          {/* <Route path="/editUser/:id" element={<Protected Cmp= {UserEdit} />} /> */}



          <Route path="/salarydetail/:salaryId" element={<Protected Cmp= {Categoryview} />} />
          <Route path="/departmentdetails/:deptId" element={<Protected Cmp= {Appview} />} />

                  {/* Employee_View */}
          <Route path="/eduView/:id" element={<Protected Cmp= {EduView} />} />
          <Route path="/salaryView/:id" element={<Protected Cmp= {SalaryView} />} />
          <Route path="/empView/:id" element={<Protected Cmp= {OnclieckEmpDetail} />} />


          <Route
          path="/addEmployee"
          element={<Protected Cmp={AddEmployeePage} />}
        />
        <Route path="/addEmployee2" element={<AddEmployeePage2 />} />
        <Route path="/Employee" element={<Protected Cmp={Employee} />} />


        <Route path="/SalaryBlock" element={<Protected Cmp={SalaryBlock} />} />
        <Route path="/SalaryUnblock" element={<Protected Cmp={SalaryUnblock} />} />


        <Route path="/SalaryLevel1" element={<Protected Cmp={SalaryLevel1} />} />
        <Route path="/Salarylevel2" element={<Protected Cmp={SalaryLevel2} />} />
        <Route path="/Salarylevel3" element={<Protected Cmp={SalaryLevel3} />} />
        <Route path="/Salarylevel4" element={<Protected Cmp={SalaryLevel4} />} />
        <Route path="/Salarylevel5" element={<Protected Cmp={SalaryLevel5} />} />



        <Route path="/QualificationBlock" element={<Protected Cmp={Block} />} />
        <Route path="/QualificationUnBlock" element={<Protected Cmp={Unblock} />} />



            {/* Edit user */}
            <Route path="/useredit1/:id" element={<Protected Cmp={EditEmployee1} />} />
            <Route path="/useredit2/:id" element={<Protected Cmp={EditEmployee2} />} />
 {/* <Route path="/addAdmin" element={<Protected Cmp= {Dashboard} />} /> */}
{/* 
          <Route path="/profile" element={<Protected Cmp={ProfilePwd} />} />
          <Route path="*" element={<Protected Cmp= {SideBar} />} />
         
           <Route path="/dashboard" element={<Protected Cmp={Mainchart}/>} />
           
           <Route path="/Employee" element={<Protected Cmp= {userTable} />} />

          <Route path="/addUser" element={<Protected Cmp= {AddUser} />} />

          <Route path="/adminachivementdetails/:Id" element={<Protected Cmp= {AdminAchivementview} />} />
        
          <Route path="/userdetails/:id" element={<Protected Cmp= {Userview} />} /> */}


        </Routes>
        <ToastContainer/>
    </Router>
  );
}

export default App;
