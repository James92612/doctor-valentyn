import React from "react"
import { Link } from "react-router-dom"
import { Empty, Image } from "antd"
import moment from "moment"
import { FaBusinessTime, FaCloudversify, FaRegThumbsDown, FaRegThumbsUp, FaRegUser, FaTrash } from "react-icons/fa"
import { truncate } from "../../../utils/truncate"
import { END_POINT } from "../../../config"
import { blogUpdate, deleteCard } from "../../../api/api_article"

const BlogCard = ({ blogData, setBlogData, flag, setFlag }) => {

  const handleclick = (id) => {
    blogUpdate(id).then((data) => {
      if (data) {
        setFlag(!flag)
      }
    })
  }

  const handeldelete = (id) => {
    deleteCard(id).then((data) => {
      data && setBlogData(data.blogs)
    })
  }

  return (
    blogData && blogData?.length > 0 ?
      <>
        {blogData.map((item, index) => (
          <div className="col-md-4 col-sm-12 mb-5" style={{ maxWidth: '25rem' }} key={item?._id + index}>
            <div className="card shadow text-center border-0 rounded-bottom">
              <div className="flex-column p-0 border-0 d-flex justify-content-center align-items-center" style={{ height: '11rem', overflow: 'hidden' }}>
                <Image src={`${END_POINT}/api/blog/photo/${item._id}`} alt="blog Image" className="w-100 h-100 rounded-top image-hover" />
              </div>
              <div className="card-body p-0">
                <div className="p-2">
                  <Link to={`/blog/${item?._id}`}>
                    <h6 className="text-start mb-1 text-capitalize" style={{ color: '#05335c' }}>{truncate(item?.title, 60)}</h6>
                  </Link>
                  <div className="d-flex text-start gap-2">
                    <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                      <FaRegUser className='form-text' />
                    </div>
                    <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                      <FaBusinessTime className='form-text' />
                      <span className="form-text">{moment(item?.createdAt).format('LL')}</span>
                    </div>
                  </div>
                  <hr className="my-1 p-0" />
                </div>
                <div className="px-2">
                  <p className="form-text text-start text-capitalize" style={{ height: 40, overflow: 'hidden' }}>{truncate(item?.description, 200)}</p>
                </div>
                <div className="mt-1 mb-3 text-start itemCenter">
                  <span className="p-2"><FaRegThumbsUp color="blue" /> {item.like} </span>
                  <span className="p-2"><FaRegThumbsDown color="blue" /> {item.unlike} </span>
                </div>
                <div className="mt-1 mb-3 text-start itemCenter">
                  {!setFlag && <Link to={`/blog/${item?._id}`}>
                    <button className="btn btn-link border-0" style={{ color: '#1977cc' }}>Read More</button>
                  </Link>}
                  {setFlag && <span className="text-success m-3" style={{ cursor: 'pointer' }} onClick={() => handleclick(item?._id)}><FaCloudversify /> Agree</span>}
                  {!setFlag && <span className="text-danger m-3" style={{ cursor: 'pointer' }} onClick={() => handeldelete(item?._id)} ><FaTrash />Delete</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </> :
      <Empty />
  )

}

export default BlogCard