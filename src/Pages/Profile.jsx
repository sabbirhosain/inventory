import { useEffect } from 'react'
import Password from '../Components/Profile/Password'
import ProfileUpdate from '../Components/Profile/ProfileUpdate'
import { useAuthContextProvider } from '../Context/AuthContext'
import Layout from '../Layout/Layout'

const Profile = () => {
  const { userProfile, userProfileFetch } = useAuthContextProvider()
  useEffect(() => { userProfileFetch() }, []);

  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center text-center bg-white p-3">
              <img style={{ maxWidth: '175px' }} src={userProfile?.user_image ? userProfile?.user_image : 'https://bootdey.com/img/Content/avatar/avatar7.png'} alt="Admin" className="rounded-circle" width="200" />
              <div className="mt-4">
                <h4>{userProfile?.full_name ? userProfile?.full_name : 'Sabbir Hosain'}</h4>
                <p className="text-secondary text-capitalize pt-2">{userProfile?.role ? userProfile?.role : 'Web Developer'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className='shadow-sm p-3 bg-white'>

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control rounded-0" value={userProfile?.first_name ? `${userProfile.first_name} ${userProfile?.last_name || ''}`.trim() : 'Sabbir Hosain'} readOnly />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">User Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control rounded-0" value={userProfile?.username ? userProfile?.username : 'sabbirhosain'} readOnly />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Email Address</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control rounded-0" value={userProfile?.email ? userProfile?.email : 'example@gmail.com'} readOnly />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Phone Number</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control rounded-0" value={userProfile?.phone ? userProfile?.phone : '01793273702'} readOnly />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Date of Birth</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control rounded-0" value={userProfile?.date_of_birth ? userProfile?.date_of_birth : 'Sabbir Hosain'} readOnly />
                </div>
              </div>
              <div className="row">
                <label className="col-sm-3 col-form-label"></label>
                <div className="col-sm-3">
                  <button className='btn btn-success rounded-0 w-100' data-bs-toggle="modal" data-bs-target="#profileUpdate">Edit Profile</button>
                  <ProfileUpdate />
                </div>
                <div className="col-sm-4 mt-3 mt-sm-0">
                  <button className='btn btn-primary rounded-0 w-100' data-bs-toggle="modal" data-bs-target="#exampleModal">Password Change</button>
                  <Password />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile