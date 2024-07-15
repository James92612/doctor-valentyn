import React, { useEffect, useState } from 'react'

import SearchSidebar from './SearchSidebar'
import SearchContent from './SearchContent'
import AdminLayout from '../../Admin/AdminLayout/AdminLayout'
import { userList } from '../../../api/api_user'
import { useLocation } from 'react-router-dom'

const SearchDoctor = () => {
    const query = {}
    const [searchTerm, setSearchTerm] = useState("")
    const [sortByGender, setSorByGender] = useState("")
    const [userData, setUserData] = useState([])
    const [initialData, setInitialData] = useState([])
    const location = useLocation();
    // const { alldata } = location.state || { alldata: [] };
    // console.log("allData:", alldata)
    useEffect(() => {
        userList().then((data) => {
            if (data) {
                data = data.reverse()
                setUserData(data)
                setInitialData(data)
            }
        })
    }, [])

    useEffect(() => {
        let temp = []
        initialData && initialData?.map((item, id) => {
            if (item.firstName.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1 || item.lastName.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1) {
                temp.push(item)
            }
        })
        setUserData(temp)

    }, [searchTerm])

    const resetFilter = () => {
        setSearchTerm("")
        setSorByGender("")
    }

    return (
        <AdminLayout>
            <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
                <div className="container-fluid">
                    <div className="row">
                        <SearchSidebar
                            setSearchTerm={setSearchTerm}
                            setSorByGender={setSorByGender}
                            resetFilter={resetFilter}
                            query={query}
                        />
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {userData && <SearchContent userData={userData} />}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default SearchDoctor