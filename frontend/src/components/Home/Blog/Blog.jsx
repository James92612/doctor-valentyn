import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getBlogs } from '../../../api/api_article'
import BlogCard from './BlogCard'

const Blog = () => {

    const [blogData, setBlogData] = useState(null)
    useEffect(() => {
        getBlogs({ agree: true }).then((data) => {
            let temp = []
            data.length > 2 ? temp = [data && data[0], data && data[1], data && data[2],] : temp = data
            setBlogData(temp)
        })
    }, [])

    return (
        <div className="container" style={{ marginTop: "8.5rem", marginBottom: '7rem' }}>
            <div className='mb-5 section-title text-center'>
                <h2>OUR BLOG</h2>
            </div>
            <div className="container">
                <div className="row">
                    <BlogCard blogData={blogData} />
                </div>
                <div className="row py-5 align-items-center justify-content-center rounded" style={{ background: '#f8f9fa' }}>
                    <div className='text-center mt-5'>
                        <Link to={'/blog'} className='more-btn'>See More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Blog