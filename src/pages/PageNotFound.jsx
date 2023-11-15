import React from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <div className='container'>
        <div className='w-50 mx-auto' style={{marginTop: '70px', marginBottom: '70px' }} >
            <h4 className='text-center'>Sorry, this page is not available.</h4>
            <p className='pt-2'>The link you followed may be broken, or the page may have been removed</p>
            <Link to='/' >Go Back to Home</Link>
        </div>

    </div>
  )
}
