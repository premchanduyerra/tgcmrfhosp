import React, { useEffect } from 'react';
import { isLoggedIn } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Menu } from '../common/menu/Menu';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/');
        }
    }, [navigate]);
    return (
        <div>
            <Menu />
            <p>Home</p>
        </div>
    );
};

export default Home;
