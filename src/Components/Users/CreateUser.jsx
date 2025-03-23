import React from 'react'
import Layout from '../../Layout/Layout'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserContextProvider } from '../../Context/UserContext';
import { createUser } from '../../Context/Api_Base_Url';
import axios from 'axios';
import { useAuthContextProvider } from '../../Context/AuthContext';

const CreateUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordShowToggle = () => { setShowPassword(!showPassword) };
  const { userDataFetch } = useUserContextProvider();
  const { refreshAccessToken } = useAuthContextProvider();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userImage, setUserImage] = useState('');
  const [role, setRole] = useState('');
  const [fieldError, setFieldError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        return setFieldError((prev) => ({
          ...prev, confirmPassword: 'Confirm Password do not match.'
        }));
      }

      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('username', userName);
      formData.append('email', email);
      formData.append('phone_number', phone);
      formData.append('date_of_birth', dateOfBirth);
      formData.append('role', role);
      formData.append('password', password);

      if (userImage) {
        formData.append('user_image', userImage);
      }

      const response = await axios.post(createUser, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response && response.data) {
        toast.success("User Added Successfully!");
        userDataFetch(1);
        navigate('/users/table');
      }
    } catch (error) {

      // Handle validation errors dynamically
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          setFieldError(errorData);
        }
      }

      if (error.response && (error.response?.status === 401 || error.response.status === 403 || error.response?.data?.code === "token_not_valid")) {
        await refreshAccessToken()
      } else {
        console.log(error);
        toast.error(error.massage || 'Internal Server Error')
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
              <h4 className='text-center py-4'>Create New User</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-6 mb-3">
                  <label className='form-label'>First Name</label>
                  <input type="text"
                    value={firstName} onChange={(event) => setFirstName(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Last Name</label>
                  <input type="text"
                    value={lastName} onChange={(event) => setLastName(event.target.value)}
                    className='form-control rounded-0' required disabled={loading} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>User Name</label>
                  <input type="text"
                    value={userName} onChange={(event) => setUserName(event.target.value)}
                    className='form-control rounded-0' required disabled={loading} />
                  {fieldError.username && <small className='text-danger'>{fieldError.username}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Phone Number</label>
                  <input type="number"
                    value={phone} onChange={(event) => setPhone(event.target.value)}
                    className='form-control rounded-0' required disabled={loading} />
                  {fieldError.phone_number && <small className='text-danger'>{fieldError.phone_number}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Email Address</label>
                  <input type="email"
                    value={email} onChange={(event) => setEmail(event.target.value)}
                    className='form-control rounded-0' required disabled={loading} />
                  {fieldError.email && <small className='text-danger'>{fieldError.email}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Role</label>
                  <select
                    value={role} onChange={(event) => setRole(event.target.value)}
                    className="form-select rounded-0" disabled={loading} required>
                    <option value=''>Select User Role</option>
                    <option value='salesman'>Salesman</option>
                    <option value='manager'>Manager</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Password</label>
                  <input type={showPassword ? "text" : "password"}
                    value={password} onChange={(event) => setPassword(event.target.value)}
                    className='form-control rounded-0' required disabled={loading} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Confirm Password</label>
                  <div className='position-relative'>
                    <input type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)} className='form-control rounded-0' required disabled={loading} />
                    <button type="button" className='password_show_btn' onClick={passwordShowToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                  </div>
                  {fieldError.confirmPassword && <small className='text-danger'>{fieldError.confirmPassword}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Image</label>
                  <input type="file"
                    accept="image/*" onChange={(e) => setUserImage(e.target.files[0])}
                    className='form-control rounded-0' disabled={loading} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Date of Birth</label>
                  <input type="date"
                    value={dateOfBirth}
                    onChange={(event) => setDateOfBirth(event.target.value)} className='form-control rounded-0' disabled={loading} />
                </div>

                <div className="col-md-6 mt-3">
                  <Link to='/users/table' type="reset" className='btn btn-dark rounded-0 w-100' disabled={loading}>Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" disabled={loading} className='btn btn-dark rounded-0 w-100'>{loading ? 'Please Wait...' : 'Create User'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CreateUser