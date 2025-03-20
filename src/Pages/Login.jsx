import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { login } from '../Context/Api_Base_Url';
import { useAuthContextProvider } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const passwordShowToggle = () => { setShowPassword(!showPassword) };
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { encryptData, decryptData } = useAuthContextProvider();

    // if user is already login than redirect dashboad page
    useEffect(() => {
        const storedData = localStorage.getItem('root');
        if (storedData) {
            try {
                const decryptedData = decryptData(storedData);
                if (decryptedData && decryptedData?.access_token) {
                    navigate('/dashboad');
                }
            } catch (error) {
                console.error('Error decrypting data:', error);
                localStorage.removeItem('root');
            }
        }
    }, [navigate, decryptData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!user || !password) {
                return setError("user and password is required...!!")
            }
            const response = await fetch(login, {
                method: 'POST', headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ user: user, password: password }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || 'Login Successfully!')
                localStorage.setItem('root', encryptData(data)); // Encrypt user data
                navigate('/dashboad');
            } else {
                setError(data.message || 'User and Password Invalid');
                console.error('Login failed:', data);
            }

        } catch (error) {
            setError('Internal Server Error');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='d-flex align-items-center justify-content-center vh-100'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <form className='shadow-sm bg-white p-4' onSubmit={handleSubmit}>
                            <h4 className='text-center mb-4'>Login Now</h4>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Email or Phone</label>
                                    <input type="text" className='form-control rounded-0 w-100' value={user} onChange={(e) => setUser(e.target.value)} disabled={loading} required />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Password</label>
                                    <div className='position-relative'>
                                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className='form-control rounded-0 w-100' disabled={loading} required />
                                        <button type="button" className='password_show_btn' onClick={passwordShowToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                                    </div>
                                </div>
                                <small className='text-danger'>{error}</small>
                                <div className="col-md-12 mt-3">
                                    <button type="submit" disabled={loading} className='btn btn-dark rounded-0 w-100'>{loading ? 'Logging in...' : 'Login Now'}</button>
                                    <small className='text-center d-block mt-4'>I forgot my account. <Link to='/register'>Recovery</Link></small>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login