import React, { useEffect } from 'react'
import { isLoggedIn } from '../../hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Menu } from '../common/menu/Menu';

export const Home = () => {
    const navigate=useNavigate ();

    


    useEffect(() => {

       if( !isLoggedIn()){
            navigate('/');
       }

    }, [])

    
    return (
        <div>
              <Menu />
                 home
        </div>
    )
}