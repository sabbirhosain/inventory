import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
// react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom"
import { ProtectedRoute, useAuthContextProvider } from "./Context/AuthContext";
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
import axios from "axios";

const App = () => {
  // axios defaults config
  const { decryptData } = useAuthContextProvider();
  const encryptedToken = localStorage.getItem("root");
  const decryptToken = encryptedToken ? decryptData(encryptedToken) : null;

  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${decryptToken?.access_token}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboad" element={<Dashboard />} />
          <Route path="/users/table" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />
          <Route path="/users/view/:id" element={<SingleUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </>
  )
}

export default App