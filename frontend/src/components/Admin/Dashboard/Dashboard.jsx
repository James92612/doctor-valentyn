import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'

import userImg from '../../../images/avatar.jpg'
import './Dashboard.css'
import { adminInfo } from '../../../constant'
import { FaBlog } from 'react-icons/fa'

const AdminDashboard = () => {

    const colors = ['primary', 'success', 'warning', 'danger']

    return (
        <>
            <AdminLayout >
                <div className="row">
                    {adminInfo.map((item, index) => (
                        <div className="col-xl-3 col-sm-6 col-12" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="dash-widget-header">
                                        <div className={`dash-widget-icon text-${item.color} border-${item.color}`}>
                                            <FaBlog />
                                        </div>
                                        <div className="dash-count">
                                            <h3>{item.all}</h3>
                                        </div>
                                    </div>
                                    <div className="dash-widget-info">
                                        <h6 className="text-muted">{item.title} : {item.number} --- {item.progress}</h6>
                                        <div className="progress progress-sm">
                                            <div className={`progress-bar bg-${item.color}`} style={{ width: item.progress }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className="row">
                    <div className="col-md-12 col-lg-6">


                        <div className="card card-chart">
                            <div className="card-header">
                                <h4 className="card-title">Revenue</h4>
                            </div>
                            <div className="card-body">
                                <div id="morrisArea"></div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-12 col-lg-6">


                        <div className="card card-chart">
                            <div className="card-header">
                                <h4 className="card-title">Status</h4>
                            </div>
                            <div className="card-body">
                                <div id="morrisLine"></div>
                            </div>
                        </div>

                    </div>
                </div> */}
                <div className="row" style={{ marginTop: '50px' }}>
                    <div className="col-md-12 d-flex">
                        <div className="card card-table flex-fill">
                            <div className="card-header">
                                <h4 className="card-title">Delete List</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover table-center mb-0">
                                        <thead>
                                            <tr>
                                                <th width='25%'>User</th>
                                                <th width='35%'>Title</th>
                                                <th width='20%'>Delete_date</th>
                                                <th width='20%'>Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h2 className="table-avatar">
                                                        <a className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src={userImg} alt="" /></a>
                                                        <a>Dr. Ruby Perrin</a>
                                                    </h2>
                                                </td>
                                                <td onClick={() => console.log('Dental')} style={{ cursor: 'pointer' }}><p>Dental</p></td>
                                                <td><p>6/24/2024</p></td>
                                                <td><p>$20.00</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-md-12">

                        <div className="card card-table">
                            <div className="card-header">
                                <h4 className="card-title">Appointment List</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover table-center mb-0">
                                        <thead>
                                            <tr>
                                                <th>Doctor Name</th>
                                                <th>Speciality</th>
                                                <th>Patient Name</th>
                                                <th>Apointment Time</th>
                                                <th>Status</th>
                                                <th className="text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h2 className="table-avatar">
                                                        <a href="profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src={userImg} alt="" /></a>
                                                        <a href="profile.html">Dr. Ruby Perrin</a>
                                                    </h2>
                                                </td>
                                                <td>Dental</td>
                                                <td>
                                                    <h2 className="table-avatar">
                                                        <a href="profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src={userImg} alt="" /></a>
                                                        <a href="profile.html">Charlene Reed </a>
                                                    </h2>
                                                </td>
                                                <td>9 Nov 2019 <span className="text-primary d-block">11.00 AM - 11.15 AM</span></td>
                                                <td>
                                                    <div className="status-toggle">
                                                        <input type="checkbox" id="status_1" className="check" checked />
                                                        <label for="status_1" className="checktoggle">checkbox</label>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    $200.00
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div> */}
            </AdminLayout>
        </>
    )
}
export default AdminDashboard 