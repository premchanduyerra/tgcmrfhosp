import React, { useEffect, useState } from 'react'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Menu } from '../common/menu/Menu';
export const VerifiedList = () => {
 const [verifiedList,setVerifiedList] = useState()
 useEffect(()=>{
        privateAxios.get('/auth/GetVerifiedList')
        .then((response)=>{
            console.log(response.data.data)
            setVerifiedList(response.data.data)
        })
        .catch((error)=>{
            console.log(error);
            toast.error(`Error ${error}`);
        })

 },[])
  const columns=[
    {
        name:'Verified Date',
        selector:row=>row.verifiedDate
    },
    {
         name:'Total Approved Applications',
         selector:row=>row.applicationCount
    },
    {
        name:'Total Rejected Applications',
        selector:row=>row.rejectedCount
    }
]
  return (
    <>
    <Menu/>
    <div className='container'>
    <DataTable
    title="Verified List"
    columns={columns}
    data={verifiedList}
    pagination
  />
  </div>
  </>
  )
}
