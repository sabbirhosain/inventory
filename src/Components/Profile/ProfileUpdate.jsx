import React, { useRef } from 'react'
import { useAuthContextProvider } from '../../Context/AuthContext'
import { updateUser } from '../../Context/Api_Base_Url';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProfileUpdate = () => {
    const { updateProfile, setUpdateProfile, userProfileFetch } = useAuthContextProvider()
    const CloseRef = useRef();

    const profileInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateProfile({ ...updateProfile, [name]: value });
    };

    const profileImageChange = (e) => {
        setUpdateProfile({ ...updateProfile, user_image: e.target.files[0] });
    };

    const profileSubmitForm = async (e) => {
        e.preventDefault();
        const { first_name, last_name, username, email, phone_number, date_of_birth, user_image } = updateProfile;

        try {
            const formData = new FormData();
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('phone_number', phone_number);
            formData.append('date_of_birth', date_of_birth);

            if (user_image && user_image instanceof File) {
                formData.append('user_image', user_image);
            } else {
                formData.append('user_image', '');
            }

            const response = await axios.put(`${updateUser}${updateProfile.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response && response.data) {
                toast.success(response.massage || 'Profile Update Success');
                CloseRef.current.click();
                userProfileFetch();
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error(error.massage || 'something wrong');
        }
    };


    return (
        <div className="modal fade" id="profileUpdate">
            <div className="modal-dialog">
                <div className="modal-content rounded-0">
                    <form onSubmit={profileSubmitForm}>
                        <div className="modal-header justify-content-center">
                            <h1 className="modal-title fs-5">Update Profile</h1>
                            <button type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close" ref={CloseRef}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>First Name</label>
                                    <input type="text" className='form-control rounded-0' name='first_name' value={updateProfile?.first_name || ""} onChange={profileInputChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Last Name</label>
                                    <input type="text" className='form-control rounded-0' name='last_name' value={updateProfile?.last_name || ""} onChange={profileInputChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>User Name</label>
                                    <input type="text" className='form-control rounded-0' name='username' value={updateProfile?.username || ""} onChange={profileInputChange} disabled />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Phone Number</label>
                                    <input type="number" className='form-control rounded-0' name='phone_number' value={updateProfile?.phone_number || ""} onChange={profileInputChange} disabled />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Email Address</label>
                                    <input type="email" className='form-control rounded-0' name='email' value={updateProfile?.email || ""} onChange={profileInputChange} disabled />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Date of Birth</label>
                                    <input type="date" className='form-control rounded-0' name='date_of_birth' value={updateProfile?.date_of_birth || ""} onChange={profileInputChange} required />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Date of Birth</label>
                                    <input type="file" accept="image/*" onChange={profileImageChange} className="form-control" />                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary rounded-0" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary rounded-0">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileUpdate