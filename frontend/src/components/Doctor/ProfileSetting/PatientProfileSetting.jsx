import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ImageUpload from '../../UI/form/ImageUpload'
import { update } from '../../../api/api_user'
import { END_POINT } from '../../../config'
import { profileFieldInfo } from '../../../constant'
import auth from '../../auth/authHelper'

const PatientProfileSetting = ({ userData, setUserData }) => {

  let jwt = auth.isAuthenticated()
  const { register, handleSubmit } = useForm({})
  const [selectedImage, setSelectedImage] = useState(null)
  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (data) => {
    const formData = new FormData()
    selectedImage && formData.append('photo', file)
    formData.append('firstName', userData.firstName)
    formData.append('lastName', userData.lastName)
    formData.append('email', userData.email)
    formData.append('country', userData.country)
    formData.append('zipcode', userData.zipcode)
    formData.append('gender', userData.gender)
    formData.append('city', userData.city)
    formData.append('address', userData.address)
    formData.append('state', userData.state)
    formData.append('mobile', userData.mobile)
    update({ id: jwt.id }, { t: jwt.token }, formData).then((data) => {
      if (data) {
        window.location.assign('/')
      }
    })
  }

  return (
    <div className="w-100 mb-3 rounded mb-5 p-3" style={{ background: '#f8f9fa' }}>
      <h5 className="text-title mb-2 mt-3">Update Your Information</h5>
      <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-12">
          <div className="form-group">
            <div className='change-avatar d-flex gap-2 align-items-center'>
              <div className="my-3 patient-img">
                <img src={selectedImage ? selectedImage : `${END_POINT}/api/userInfo/photo/${userData?._id}`} alt="" />
              </div>
              <div className="mt-3">
                <ImageUpload setSelectedImage={setSelectedImage} setFile={setFile} />
              </div>
            </div>
          </div>
        </div>
        {profileFieldInfo.map((item, index) => (
          <div className="col-md-6" key={index}>
            {
              item.name !== 'gender' ? <div className="form-group mb-2 card-label">
                <label>{item.label}<span className="text-danger">*</span></label>
                <input onChange={(e) => handleChange(e)} name={item.name} value={userData[item.name]} className="form-control" disabled={jwt.id === userData._id ? false : true} />
              </div> :
                <div className="form-group mb-2 card-label">
                  <label>Gender</label>
                  <select className="form-control select" onChange={(e) => handleChange(e)} name='gender' value={userData.gender} disabled={jwt.id === userData._id ? false : true} >
                    <option value='male' className='text-capitalize'>male</option>
                    <option value='female' className='text-capitalize'>female</option>
                  </select>
                </div>
            }
          </div>
        ))}
        {
          jwt.id === userData._id &&
          <div className='text-center'>
            <button type="submit" className="btn btn-primary my-3">Save Changes</button>
          </div>
        }

      </form>
    </div>
  )
}

export default PatientProfileSetting