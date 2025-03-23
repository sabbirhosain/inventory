import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { singleUser } from '../../Context/Api_Base_Url';
import { useAuthContextProvider } from '../../Context/AuthContext';

const SingleUser = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const { refreshAccessToken } = useAuthContextProvider();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(`${singleUser}${id}`);
                setUserData(response.data.data);
            } catch (error) {
                if (error.response && (error.response?.status === 401 || error.response.status === 403 || error.response?.data?.code === "token_not_valid")) {
                    await refreshAccessToken()
                } else {
                    console.log(error);
                }
            }
        }
        getUserData()
    }, []);


    return (
        <Layout>
            <section className='container my-5'>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form className='shadow-sm bg-white px-5 pt-3 pb-4'>
                            <h4 className='text-center py-4'>Single User Details</h4>
                            <div className="row border-top border-warning pt-4">
                                <div className="col-md-4 mb-3">
                                    <img src={userData?.user_image ? userData?.user_image : "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?w=826&t=st=1726582928~exp=1726583528~hmac=f5f57e59f2e03486c4c56b803637cd61e4b87e4306ddb4d9ca92676192667ac2"} className='img-thumbnail' alt="User image" />
                                </div>
                                <div className="col-md-8 mb-3">
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Full Name : </span></div>
                                                <div className="col-8"><span>{userData?.first_name + ' ' + userData?.last_name}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>User Name : </span></div>
                                                <div className="col-8"><span>{userData?.username}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Phone : </span></div>
                                                <div className="col-8"><span>{userData?.phone_number}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Email : </span></div>
                                                <div className="col-8"><span>{userData?.email}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Role : </span></div>
                                                <div className="col-8"><span>{userData?.role}</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                <div className="col-4"><span>Birth Date : </span></div>
                                                <div className="col-8"><span>{userData?.date_of_birth}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <Link to='/users/table' type="reset" className='btn btn-dark rounded-0 w-100'>Back</Link>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <Link to={`/users/update/${id}`} type="reset" className='btn btn-dark rounded-0 w-100'>Update</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default SingleUser