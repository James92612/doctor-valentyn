import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegThumbsUp, FaComment } from "react-icons/fa"
import StarRatings from 'react-star-ratings'
import { Badge, Empty, } from 'antd'

import { END_POINT } from '../../../config'
import './index.css'

const SearchContent = ({ userData }) => {

  return (
    userData && userData?.length > 0 ?
      <>
        {userData.map((item, index) => {
          return (
            <div key={index}>
              <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
                <div className='d-flex p-3 justify-content-between'>
                  <div className='d-flex gap-3'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                      <img src={`${END_POINT}/api/userInfo/photo/${item._id}`} className="" alt="User Image" />
                    </div>
                    <div className="doc-info">
                      <h5 className='mb-0'><Link to={`/users/profile/${item?._id}`}>Dr. {item?.firstName + ' ' + item?.lastName}</Link></h5>
                      <div className='d-flex align-items-center'>
                        <StarRatings
                          rating={5}
                          starRatedColor="#f4c150"
                          numberOfStars={5}
                          name='rating'
                          starDimension="15px"
                          starSpacing="2px"
                        />
                      </div>
                      <p className='m-0 form-text'>{item?.gender}</p>

                      <div className="clinic-details">
                        <p className="form-text text-secondary">{item?.address}, {item?.country}</p>
                      </div>
                    </div>
                  </div>
                  <div className="doc-info-right me-3">
                    <div className="clini-infos">
                      <ul>
                        <li><FaRegThumbsUp />  97%</li>
                        <li><FaComment /> 4 Feedback</li>
                      </ul>
                    </div>
                    <div className="clinic-booking">
                      <Link to={`/profile/${item?._id}`} className="view-pro-btn">
                        {!item.viewed ? <Badge dot={true}>View Profile</Badge> : <>View Profile</>}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </> : <Empty />
  )
}
export default SearchContent