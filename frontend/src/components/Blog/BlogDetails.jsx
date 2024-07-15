import React, { useEffect, useState } from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa"

import BlogComment from './BlogComment'
import SubHeader from '../Shared/SubHeader'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import { Container } from 'react-bootstrap'
import BlogCard from '../Home/Blog/BlogCard'
import { useParams } from 'react-router-dom'
import { blogOne, likeBlog, unlikeBlog } from '../../api/api_article'
import { read } from '../../api/api_user'
import auth from '../auth/authHelper'
import { Button } from 'antd'

const BlogDetails = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState([])
    const [key, setKey] = useState(false)
    useEffect(() => {
        // Assuming blogOne is an async function that fetches the blog data by ID
        const fetchBlogData = async () => {
            try {
                let temp = []
                const data = await blogOne(id);
                if (data) {
                    await read({ id: data.postedBy._id }, { t: auth.isAuthenticated().token }).then((data) => {
                        console.log("useData:", data)
                    })
                    temp.push(data)
                }
                setBlogData(temp)
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };
        fetchBlogData();
    }, [id, key]);

    const handleLike = (id) => {
        likeBlog(id).then((data) => {
            setKey(!key)
        })
    }
    const handleUnLike = (id) => {
        unlikeBlog(id).then((data) => {
            setKey(!key)
        })
    }
    return (
        <>
            <Header />
            <SubHeader title='Blog Details' subtitle='Lorem ipsum dolor sit amet.' />
            <Container className="container-fluid" style={{ marginTop: 150 }}>
                <div className="row mx-2">
                    <div className="col-sm-12">
                        <hr />
                        <div className="d-flex justify-content-end">
                            <div className="col-md-5 col-lg-4 ml-lg-0 text-end text-md-end">
                                <h5 className="text-dark rounded d-inline me-2">Share On </h5>
                                <a className="btn btn-outline-primary btn-floating m-1" >
                                    <FaFacebookSquare />
                                </a>
                                <a className="btn btn-outline-primary btn-floating m-1">
                                    <FaInstagramSquare />
                                </a>
                                <a className="btn btn-outline-primary btn-floating m-1">
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>
                        <BlogCard blogData={blogData} />

                        {/* <BlogComment /> */}
                        <Button onClick={() => handleLike(id)}>agree</Button>
                        <Button onClick={() => handleUnLike(id)}>disagree</Button>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default BlogDetails