import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUserContextProvider } from "../../Context/UserContext";

const UserTable = () => {
  const paginationOptions = { noRowsPerPage: true };
  const { userDataFetch, userList, userError, isLoadingUser, userRoleFilter, userSearchFilter, userStatusFilter, userDelete } = useUserContextProvider();
  useEffect(() => { userDataFetch(1) }, [userRoleFilter, userStatusFilter, userSearchFilter]);

  // data table page change
  const onPageChange = page => {
    userDataFetch(page);
  };


  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
    },
    {
      name: "Image",
      selector: row => <a href={row.user_image} target="_new">
        <img src={row.user_image || ''} width='40' />
      </a>,
      width: "100px",
    },
    {
      name: "Name",
      selector: row => row.first_name + ' ' + row.last_name,
      width: "200px"
    },
    {
      name: "User Name",
      selector: row => row.username,
      width: "200px"
    },
    {
      name: "Email",
      selector: row => row.email,
      width: "300px"
    },
    {
      name: "Phone Number",
      selector: row => row.phone_number,
      width: "200px"
    },
    {
      name: "Date of Birth",
      selector: row => row.date_of_birth,
      width: "150px"
    },
    {
      name: "User Role",
      selector: row => row.role,
      width: "150px"
    },
    {
      name: "Status",
      selector: row => {
        switch (row.user_status) {
          case "hold":
            return <button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Hold</button>;
          case "pending":
            return <button style={{ backgroundColor: "orange", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Pending</button>;
          default:
            return <button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Active</button>;
        }
      },
      width: "150px"
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`/users/view/${row.id}`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
        <Link to={`/users/update/${row.id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        <button onClick={() => userDelete(row.id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
        <button className="btn btn-outline-dark rounded-0 btn-sm"><FaCheck /></button>
      </div>,
      width: "200px"
    }
  ];


  if (userError) {
    return <div>Error: {userError.message}</div>;
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={userList.results}
          pagination
          paginationServer
          paginationComponentOptions={paginationOptions}
          progressPending={isLoadingUser}
          paginationTotalRows={userList.count}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default UserTable