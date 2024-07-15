import React from 'react'
import { NavLink } from 'react-router-dom'
import { Image } from 'antd'

import './DashboardSidebar.css'
import { navLinkInfo } from '../../constant'
import { END_POINT } from '../../config'
import auth from '../auth/authHelper'

const DashboardSidebar = () => {

    let jwt = auth.isAuthenticated()

    return (
        <div className="profile-sidebar p-3 rounded">
            <div className="p-2 text-center border-bottom">
                <div className="profile-info text-center">
                    <Image width={100} src={`${END_POINT}/api/userInfo/photo/${jwt.id}`} alt="" />
                </div>
            </div>
            <nav className="dashboard-menu">
                <ul className="mobile-menu-nav">
                    {navLinkInfo.map((item, index) => (
                        <li key={index} style={{ fontSize: '18px' }}><NavLink to={item.link} className="nav-link alignCenter">{item.icon}{item.title}</NavLink></li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
export default DashboardSidebar 