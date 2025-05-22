import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import Home from '../pages/publicPages/home/Home';
import Register from '../pages/publicPages/Register/Register';
import Login from '../pages/publicPages/Login/Login';
import Contact from '../pages/publicPages/contact/Contact';
import ServiceList from '../pages/publicPages/serviceList/ServiceList';
import ForgetPassword from '../pages/publicPages/forgetPassword/ForgetPassword';
import ChangePassword from '../pages/publicPages/changePassword/ChangePassword';
import { PrivateRoutes } from './PrivateRoutes';
import { ClientLayout } from '../layouts/ClientLayout';
import ClientDashboard from '../pages/clientPages/dashboard/ClientDashboard';
import CompleteRegister from '../pages/clientPages/completeRegister/CompleteRegister';
import EditProfile from '../pages/clientPages/editProfile/EditProfile';
import { EmployeeLayout } from '../layouts/EmployeeLayout';
import EmployeeDashboard from '../pages/employeePages/dashboard/EmployeeDashboard';
import ClientList from '../pages/employeePages/clientList/ClientList';
import EmployeeClientProfile from '../pages/employeePages/EmployeeClientProfile/EmployeeClientProfile';
import EmployeeCalendar from '../pages/employeePages/employeeCalendar/EmployeeCalendar';
import AddAppoinment from '../pages/employeePages/addAppoinment/AddAppoinment';
import EditAppoinment from '../pages/employeePages/editAppoinment/EditAppoinment';
import { AdminLayout } from '../layouts/AdminLayout';
import AdminDashboard from '../pages/adminPages/adminDashboard/AdminDashboard';
import CreateEmployee from '../pages/adminPages/createEmployee/CreateEmployee';
import EmployeeList from '../pages/adminPages/EmployeeList/EmployeeList';
import EditEmployee from '../pages/adminPages/editEmployee/EditEmployee';
import AdminClientList from '../pages/adminPages/clientList/AdminClientList';
import Service from '../pages/adminPages/service/Service';
import { EditService } from '../pages/adminPages/editService/EditService';

//Usuario del context
import { AuthContext } from '../context/AuthContextProvider';
//componentes públicos

//componentes Client

//componentes Empleado

//componentes Admin

export const AppRoutes = () => {

 const {user} = useContext(AuthContext);

 console.log("userrrr", user);
 
 
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<ServiceList />} />
              <Route path="/forgetPassword" element={<ForgetPassword />} />
              <Route path="/changePassword" element={<ChangePassword />} />
            </Route>
          </Route>
          {/* Rutas Cliente */}
          <Route element={<PrivateRoutes userType={user?.type} requiredUser={3} />}>
            <Route element={<ClientLayout />}>
              <Route path="/client" element={<ClientDashboard />} />
              <Route
                path="/client/completeRegister"
                element={<CompleteRegister />}
              />
              <Route path="/client/editClient" element={<EditProfile />} />
            </Route>
          </Route>

          {/* Rutas Empleado */}
          <Route element={<PrivateRoutes userType={user?.type} requiredUser={2} />}>
            <Route element={<EmployeeLayout />}>
              <Route path="/employee" element={<EmployeeDashboard />} />
              <Route path="/employee/clientList" element={<ClientList />} />
              <Route
                path="/employee/clientProfile" 
                element={<EmployeeClientProfile />}
              />
              <Route path="/employee/calendar" element={<EmployeeCalendar />} />
              <Route
                path="/employee/addAppoinment"
                element={<AddAppoinment />}
              />
              <Route
                path="/employee/editAppoinment"
                element={<EditAppoinment />}
              />
            </Route>
          </Route>

          {/* Rutas Admin */}
          <Route element={<PrivateRoutes userType={user?.type} requiredUser={1} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/admin/createEmployee"
                element={<CreateEmployee />}
              />
              <Route path="/admin/employeeList" element={<EmployeeList />} />
              <Route path="/admin/editEmployee" element={<EditEmployee />} />
              <Route path="/admin/clientList" element={<AdminClientList />} />
              <Route path="/admin/service" element={<Service />} />
              <Route path="/admin/editService" element={<EditService />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
