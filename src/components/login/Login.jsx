import React, { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { loginUser } from '../../services/authService'
import { doLogin } from '../../hooks/auth'
import { useNavigate } from 'react-router-dom'
export const Login = () => {
    const navigate=useNavigate()

    const [show,setShow]=useState(false)
    const [loginDetails,setLoginDetails]=useState({
        userName:'',
        password:''
    })

    const handleChange=(e,field)=>{
        setLoginDetails({...loginDetails,[field]:e.target.value})
      }
      const handleFormSubmit=(e)=>{

        e.preventDefault();
        setShow(true)
        //validations
        if(loginDetails.username===''|| loginDetails.password===''){
          toast.error('Username or Password cannot be empty')
          return
        }
      
        //submit the data to server to generate token
        loginUser(loginDetails).then(response=>{
          console.log(response);
          setShow(false)
          //save the data to sessionStorage
          doLogin(response,()=>{
            
            if(response.statuscode===300){
              toast.error(response.message)
              setLoginDetails({
                userName:'ss',
                password:'ss',
                userType:'P'
              })
              return;
            }
             console.log('Login Data stored to session storage');
             if(response.responseData.users.userType==='P')
                navigate('/user/citizen')
             else 
                 navigate('/user/home') 
                
                
                 toast.success('Login Success')
          })
        }).catch((error)=>{
          setShow(false)
          //  if(error.response.status===400||error.response.status===404){
          //   toast.error(error.response.data.message)
          //  }
          //  else{
          //   toast.error('Something went wrong on server!!')
          //  }
        })
      }


  return (
    <div>
          <div className='formcontainer'>
             <form method='post'>
             <h4 style={{fontSize:'16px',color:'#001070',borderBottom:'3px solid #0096da'}} className='pb-2'>Official Login</h4>
             <label>Username</label>
             <input type='text' value={loginDetails} onChange={e=>handleChange(e,'username')}/>
             <label>Password</label>
             <input type='password'/>
             <button type='submit'>Sign In</button>
             </form>
        </div>
    
    </div>
  )
}
