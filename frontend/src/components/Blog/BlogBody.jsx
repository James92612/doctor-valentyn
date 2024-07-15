import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'

import BlogAside from './BlogAside'
import { getBlogs } from '../../api/api_article'
import BlogCard from '../Home/Blog/BlogCard'
import auth from '../auth/authHelper'
import { blogType } from '../../constant'

const BlogBody = ({ showType, userid }) => {

  let jwt = auth.isAuthenticated()
  const [type, setType] = useState('All')
  const [size, setSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [blogData, setBlogData] = useState([])
  // const [prevData, setPrevData] = useState([])
  // const [length, setLength] = useState(0)
  const [initialBlog, setInitialBlog] = useState([])

  const handleChange = (e) => {
    setType(e.target.value);
  }
  useEffect(() => {
    getBlogs({ agree: true }).then((data) => {
      if (data) {
        let temp = []
        if (showType === 'profile') {
          data.map((item) => (item.postedBy === userid && temp.push(item)))
          setBlogData(temp)
          setInitialBlog(temp)
        } else {
          data.map((item) => (item.agree === true && temp.push(item)))
          setBlogData(temp)
          setInitialBlog(temp)
        }
      }
    })
  }, [])

  useEffect(() => {
    let temp = []
    type !== 'All' ? initialBlog.map((item) => (
      item.type === type && temp.push(item)
    )) : temp = initialBlog
    let newTemp = []
    searchTerm ? temp.map((item) => (
      item.title.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1 && newTemp.push(item)
    )) : newTemp = temp
    setBlogData(newTemp)
  }, [type, searchTerm])

  // const handlePrevNext = (e) => {
  //   const temp = []
  //   for (var i = (e - 1) * size; i < e * size; i++) {
  //     temp.push(blogData[i])
  //   }
  //   setBlogData(temp)
  // }

  return (
    <div className="container-fluid" style={{ marginTop: 150, marginBottom: 100 }}>
      <div className="col-md-12">
        <div className="form-group mb-2 card-label">
          <label style={{ fontSize: 20 }}>Type:</label>
          <select style={{ width: '300px', padding: '9px', border: 'solid 1px #ddd', borderRadius: '5px' }} defaultValue="All" onChange={handleChange}>
            {blogType.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9 col-sm-12">
          <div className="p-3 py-5 mx-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="row">
              <BlogCard blogData={blogData} setBlogData={setBlogData} />
            </div>
            {/* <div className="text-center mt-5">
            <Pagination
              defaultCurrent={size}
              total={length}
              showSizeChanger={true}
              showPrevNextJumpers={true}
              onChange={handlePrevNext}
              pageSize={size}
            />
          </div> */}
          </div>
        </div>
        <div className="col-md-3 col-sm-12">
          <BlogAside setSearchTerm={setSearchTerm} />
        </div>
      </div>
    </div>

  )
}

export default BlogBody