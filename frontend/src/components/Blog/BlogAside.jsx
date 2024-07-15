import React from 'react'
import { FaAngleDoubleRight } from "react-icons/fa"
import Search from 'antd/es/input/Search'

import './index.css'
import { specialInfo } from '../../constant'

const BlogAside = ({ setSearchTerm }) => {

    return (
        <div className='p-3' style={{ background: '#f8f9fa' }}>

            <div className="mb-4">
                <h5 className="blog-title">SEARCH</h5>
                <Search placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} style={{ width: "100%" }} />
            </div>

            <div className="mb-4">
                <h5 className="blog-title">CATEGORIES</h5>
                {specialInfo.map((item, index) => (
                    <div className="my-2 d-flex gap-2 align-items-center categories-title" key={index} onClick={() => setSearchTerm(item.title)}>
                        <FaAngleDoubleRight className='icon' /><h6 className='my-2'>{item.title}</h6>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BlogAside