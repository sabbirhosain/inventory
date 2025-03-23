import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { singleUser, updateUser } from '../../Context/Api_Base_Url';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserContextProvider } from '../../Context/UserContext';
import { useAuthContextProvider } from '../../Context/AuthContext';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userDataFetch } = useUserContextProvider()
  const { refreshAccessToken } = useAuthContextProvider();
  const [fieldError, setFieldError] = useState({});
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
    user_image: null,
    role: "",
  });

  // Get user data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${singleUser}${id}`);
        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserData()
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setUserData({ ...userData, user_image: e.target.files[0] });
  };

  // Update the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (key === "user_image" && userData.user_image === null) { return; }
        formData.append(key, userData[key]);
      });

      const response = await axios.put(`${updateUser}${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response && response.data) {
        toast.success("User Updated Successfully!");
        userDataFetch(1);
        navigate("/users/table");
      }
    } catch (error) {
      // Handle validation errors dynamically
      if (error.response && error.response.data.errors) {
        const errorData = error.response.data.errors;
        if (typeof errorData === 'object') {
          setFieldError(errorData);
        }
      }

      if (error.response && (error.response?.status === 401 || error.response.status === 403 || error.response?.data?.code === "token_not_valid")) {
        await refreshAccessToken()
      } else {
        console.log(error);
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout>
      <section className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className='shadow-sm bg-white px-5 pt-3 pb-4'>
              <h4 className='text-center py-4'>Update User Details</h4>
              <div className="row border-top border-warning pt-4">
                <div className="col-md-6 mb-3">
                  <label className='form-label'>First Name</label>
                  <input type="text" name="first_name" value={userData?.first_name || ""} onChange={handleChange} className='form-control rounded-0' required disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Last Name</label>
                  <input type="text" name="last_name" value={userData?.last_name || ""} onChange={handleChange} className='form-control rounded-0' required disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>User Name</label>
                  <input type="text" name="username" value={userData?.username || ""} onChange={handleChange} className='form-control rounded-0' required disabled={loading} />
                  {fieldError.username && <small className='text-danger'>{fieldError.username}</small>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Phone Number</label>
                  <input type="text" name="phone_number" value={userData?.phone_number || ""} onChange={handleChange} className='form-control rounded-0' required disabled={loading} />
                  {fieldError.phone_number && <small className='text-danger'>{fieldError.phone_number}</small>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Email Address</label>
                  <input type="email" name="email" value={userData?.email || ""} onChange={handleChange} className='form-control rounded-0' required disabled={loading} />
                  {fieldError.email && <small className='text-danger'>{fieldError.email}</small>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Date of Birth</label>
                  <input type="date" name="date_of_birth" value={userData?.date_of_birth || ""} onChange={handleChange} className='form-control rounded-0' disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label'>Image</label>
                  <input type="file" onChange={handleFileChange} className='form-control rounded-0' disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className='form-label rounded-0'>Role</label>
                  <select name="role" value={userData.role || ""} onChange={handleChange} className="form-select" disabled={loading}>
                    <option value=''>Select User Role</option>
                    <option value='salesman'>Salesman</option>
                    <option value='manager'>Manager</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                <div className="col-md-6 mt-3">
                  <Link to='/users/table' type="reset" className='btn btn-dark rounded-0 w-100' disabled={loading}>Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className='btn btn-dark rounded-0 w-100' disabled={loading}>Update User</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default UpdateUser