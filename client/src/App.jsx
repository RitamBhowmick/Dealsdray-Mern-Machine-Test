import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import DashBoard from "./components/DashBoard.jsx";
import CreateEmployee from "./components/CreateEmployee.jsx";
import EmployeeListPage from "./components/EmployeeListPage.jsx";
import EditEmployeeList from "./components/EditEmployeePage.jsx";


function App() {  
  return (
    <div>
    
   
   <BrowserRouter>
    <Routes>
      <Route element={<LoginPage/>} path='/'></Route>
      <Route element={<RegistrationPage/>} path='/register'/>
      <Route element={<DashBoard />} path='/dashboard/:ID'/>
      <Route element={<CreateEmployee />} path="create-employee"/>
      <Route element={<EmployeeListPage/>} path="/employee-list"/>
      <Route element={<EditEmployeeList/>} path="/edit-employee/:ID"/>
    </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App
