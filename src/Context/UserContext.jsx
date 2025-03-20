import { createContext, useContext, useState } from "react";
import axios from "axios";
import { showUser } from "./Api_Base_Url";

const UserContextProvider = createContext();

const UserContext = ({ children }) => {

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
            const response = await axios.get(`${showUser}?role=${userRoleFilter?.value}&status=${userStatusFilter?.value}&search=${userSearchFilter}&page=${page}`);
            setUserList(response.data);

        } catch (error) {
            console.log(error);
            setUserError(error);
        } finally {
            setIsLoadingUser(false);
        }
    }


    return (
        <UserContextProvider.Provider value={{
            userList, userDataFetch, userError, isLoadingUser, userRoleFilter, setUserRoleFilter, userSearchFilter, setUserSearchFilter, userStatusFilter, setUserStatusFilter
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