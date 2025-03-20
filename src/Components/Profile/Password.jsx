import React from 'react'

const Password = () => {
    return (
        <div className="modal fade" id="exampleModal">
            <div className="modal-dialog">
                <div className="modal-content rounded-0">
                    <form action="">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Old Password</label>
                                    <input type="password" className='form-control rounded-0' />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>New Password</label>
                                    <input type="password" className='form-control rounded-0' />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Confirm Password</label>
                                    <input type="password" className='form-control rounded-0' />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-secondary rounded-0">Reset</button>
                            <button type="submit" className="btn btn-primary rounded-0">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password