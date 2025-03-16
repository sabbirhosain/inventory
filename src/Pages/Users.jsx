import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import Select from 'react-select';
import UserTable from '../Components/Users/UserTable';
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Link } from 'react-router-dom';

const Users = () => {
  const [userList, setUserList] = useState()
  const [loading, setLoading] = useState(false)

  const options = [
    { value: '1', label: 'Super Admin' },
    { value: '2', label: 'Accountant' },
    { value: '3', label: 'User' },
  ]

  const handleChange = (selectedUserType) => {
    setUserList(selectedUserType);
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px"
    }),
  };


  return (
    <Layout>
      <section className=''>

        <div className='d-flex align-items-center justify-content-between bg-white p-3 ps-3 pe-md-5 my-2'>
          <h4 className='table_name_title'>User List</h4>
          <Link to='/users/create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
        </div>

        <div className="row bg-white p-3">
          <div className="col-md-3">
            <div className='w-100 mb-3 mb-md-0'>
              <Select
                options={options}
                value={userList}
                onChange={handleChange}
                isLoading={loading}
                placeholder={loading ? "Loading..." : "Select User Type..."}
                isClearable={true}
                styles={customStyles}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className='w-100 mb-3 mb-md-0'>
              <input className="form-control rounded-0" type="date" />
            </div>
          </div>
          <div className="col-md-3">
            <div className='w-100 mb-3 mb-md-0'>
              <input className="form-control rounded-0" type="date" />
            </div>
          </div>
          <div className="col-md-3">
            <div className='w-100'>
              <input className="form-control rounded-0" type="search" placeholder="Search Hear..." />
            </div>
          </div>
        </div>

        <div className='mt-2'>
          <UserTable />
        </div>
      </section>
    </Layout>
  )
}

export default Users