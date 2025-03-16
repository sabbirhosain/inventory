import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
// react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom"
import "./App.css"
// pages
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Users from "./Pages/Users";
import CreateUser from "./Components/Users/CreateUser";
import UpdateUser from "./Components/Users/UpdateUser";
import SingleUser from "./Components/Users/SingleUser";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users/table" element={<Users />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/update" element={<UpdateUser />} />
        <Route path="/users/view" element={<SingleUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App