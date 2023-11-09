import React, { useEffect, useState } from 'react';
import './login.css';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/authService';
import { doLogin, isLoggedIn } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    userName: '',
    password: '',
  });

  const handleChange = (e, field) => {
    setLoginDetails({ ...loginDetails, [field]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validations
    if (loginDetails.userName === '' || loginDetails.password === '') {
      toast.error('Username or Password cannot be empty');
      setLoading(false);
      return;
    }

    try {
      // Submit the data to server to generate token
      const response = await loginUser(loginDetails);
      console.log(response);
      setLoading(false);

      // Save the data to sessionStorage
      doLogin(response, () => {
        if (response.statusCode === 308) {
          toast.error(response.message);
          setLoginDetails({
            userName: '',
            password: '',
          });
          return;
        }
        console.log('Login Data stored to session storage');
        navigate('/patient-report');
        toast.success('Login Success');
      });
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong on server!!');
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/patient-report');
    }
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="formcontainer">
        <form onSubmit={handleFormSubmit}>
          <h4 style={{ fontSize: '18px', color: '#001070', borderBottom: '3px solid #0096da' }} className="pb-2">
            Official Login
          </h4>
          <label className="label">Username</label>
          <div style={{ position: 'relative' }}>
            <input type="text" value={loginDetails.userName} onChange={(e) => handleChange(e, 'userName')} name="userName" id="userName" />
            <i className="bi bi-person-circle" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}></i>
          </div>
          <label className="label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={loginDetails.password}
              onChange={(e) => handleChange(e, 'password')}
              name="password"
              id="password"
            />
            <i
              className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={togglePassword}
            ></i>
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
