import { createContext, useContext, useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { singleUser } from './Api_Base_Url';
const AuthContextProvider = createContext();

const AuthContext = ({ children }) => {
    const navigate = useNavigate();
    const SECRET_KEY = import.meta.env.VITE_CRYPTOJS_SECRET_KEY || 'YourFallbackSecretKey';

    // encrypt localstroge data
    const encryptData = (data) => {
        try {
            if (!data) { console.log("No data found to encrypt."); return null }
            return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
        } catch (error) {
            console.error("Encryption error:", error);
            return null;
        }
    }

    // decrypt localstroge data
    const decryptData = (encryptedData) => {
        try {
            if (!encryptedData) { console.log("No data found to decrypt."); return null }
            const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    }

    // User Logout
    const logout = () => {
        localStorage.removeItem('root');
        navigate('/login');
    };

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.log('Unauthorized or Forbidden. Logging out...');
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [logout]);

    // User Profile Fetch
    const [updateProfile, setUpdateProfile] = useState({ first_name: "", last_name: "", username: "", email: "", phone_number: "", date_of_birth: "", user_image: null });
    const [userProfile, setUserProfile] = useState({});
    const userProfileFetch = async () => {
        try {
            const encryptedToken = localStorage.getItem("root");
            const decryptToken = encryptedToken ? decryptData(encryptedToken) : null;

            if (decryptToken) {
                const response = await axios.get(`${singleUser}${decryptToken?.user?.id}`);
                if (response && response.data) {
                    setUserProfile(response.data.data);
                    setUpdateProfile((prev) => ({ ...prev, ...response.data.data }));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <AuthContextProvider.Provider value={{ encryptData, decryptData, logout, userProfile, setUpdateProfile, userProfileFetch, updateProfile, }}>
            {children}
        </AuthContextProvider.Provider>
    )
}

export default AuthContext;

// coustom hooks
export const useAuthContextProvider = () => {
    return useContext(AuthContextProvider)
};


// Protected Route Component
export const ProtectedRoute = ({ children }) => {
    const { decryptData } = useAuthContextProvider();
    const encryptedToken = localStorage.getItem("root");
    const decryptToken = encryptedToken ? decryptData(encryptedToken) : null;

    if (!decryptToken?.access_token) {
        return <Navigate to="/login" />;
    } else {
        return children ? children : <Outlet />;
    }
};




