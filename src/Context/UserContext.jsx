import { createContext, useContext, useState } from "react";
import axios from "axios";
import { destroyUser, showUser } from "./Api_Base_Url";
import { useAuthContextProvider } from "./AuthContext";
import Swal from "sweetalert2";

const UserContextProvider = createContext();

const UserContext = ({ children }) => {
    const { refreshAccessToken } = useAuthContextProvider();


    // All User List
    const [userError, setUserError] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [userList, setUserList] = useState({});
    const [userRoleFilter, setUserRoleFilter] = useState(null);
    const [userSearchFilter, setUserSearchFilter] = useState("");
    const [userStatusFilter, setUserStatusFilter] = useState(null);

    const userDataFetch = async (page) => {
        try {
            setIsLoadingUser(true);
            const response = await axios.get(`${showUser}?role=${userRoleFilter?.value || userRoleFilter}&status=${userStatusFilter?.value || userStatusFilter}&search=${userSearchFilter}&page=${page}`);

            if (response && response.data) {
                setUserList(response.data);
            }

        } catch (error) {
            if (error.response && (error.response?.status === 401 || error.response.status === 403 || error.response?.data?.code === "token_not_valid")) {
                await refreshAccessToken()
            } else {
                setUserError(error);
                console.log(error);
            }

        } finally {
            setIsLoadingUser(false);
        }
    }

    // User Delete
    const userDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete!',
            cancelButtonText: 'Cancel!',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${destroyUser}${id}`);
                    if (response && response.data) {
                        Swal.fire('Deleted!', 'Item successfully deleted.', 'success');
                        userDataFetch(1);
                    }
                } catch (error) {
                    if (error.response && (error.response?.status === 401 || error.response.status === 403 || error.response?.data?.code === "token_not_valid")) {
                        await refreshAccessToken()
                    } else {
                        Swal.fire('Error!', 'An error occurred while deleting.', 'error');
                        console.log(error);
                    }
                }

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your item is safe :)', 'info');
            }
        });
    };

    // Change User Role
    const userStatusChange = async (id, currentStatus) => {
        try {
            let newStatus;

            if (currentStatus === "pending") {
                newStatus = "active";
            } else if (currentStatus === "active") {
                newStatus = "hold";
            } else {
                newStatus = "pending";
            }

            const response = await axios.patch(`${updateUser}${id}`, {
                "user_status": newStatus
            });

            if (response && response.data) {
                toast.success("Status Updated Successfully!");
                userDataFetch(1);
            }
        } catch (error) {
            if (error.response && (error.response?.status === 401 || error.response.status === 403 || error.response?.data?.code === "token_not_valid")) {
                await refreshAccessToken()
            } else {
                console.log(error);
            }
        }
    }



























    return (
        <UserContextProvider.Provider value={{
            userList, userDataFetch, userError, isLoadingUser, userRoleFilter, setUserRoleFilter, userSearchFilter, setUserSearchFilter, userStatusFilter, setUserStatusFilter, userDelete
        }}>
            {children}
        </UserContextProvider.Provider>
    )
}

export default UserContext

// coustom hooks
export const useUserContextProvider = () => {
    return useContext(UserContextProvider)
};