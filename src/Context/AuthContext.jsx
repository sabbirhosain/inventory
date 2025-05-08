import { createContext, useContext, useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { refreshToken, singleUser } from './Api_Base_Url';
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


    // Refresh Token
    const location = useLocation();
    const refreshAccessToken = async () => {
        const encryptedToken = localStorage.getItem("root");
        const decryptToken = encryptedToken ? decryptData(encryptedToken) : null;

        if (!decryptToken?.refresh_token) {
            console.error("Refresh token failed:");
            localStorage.removeItem("root");
            window.location.href = "/login";
            return null;
        }

        try {
            const response = await fetch(refreshToken, {
                method: 'POST', headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ refresh: decryptToken.refresh_token, }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('root', encryptData(data));
                // window.location.href = "/dashboad";
                window.location.href = location.pathname;
                return data;
            } else {
                console.error('Refresh Token failed:', data);
            }
        } catch (error) {
            console.error("Refresh token failed:", error);
        }
    };

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
            if (error.response && (error.response?.status === 401 || error.response.status === 403 || error.response?.data?.code === "token_not_valid")) {
                await refreshAccessToken()
            } else {
                console.log(error);
            }
        }
    }


    return (
        <AuthContextProvider.Provider value={{ encryptData, decryptData, logout, userProfile, setUpdateProfile, userProfileFetch, refreshAccessToken, updateProfile, }}>
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




