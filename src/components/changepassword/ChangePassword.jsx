import React from 'react'
import { Button } from 'reactstrap'
import { Menu } from '../common/menu/Menu'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { privateAxios } from '../../hooks/axios/axiosHelper'

export const ChangePassword = () => {
    const [userPwd, setUserPwd] = useState({
        currentPwd:'',
        newPwd:'',
        confirmPwd:''
    })
    const [valiadations,setValidations]=useState('');
    const handleChange=(e,field)=>{
       setUserPwd({...userPwd,[field]:e.target.value})
      }
    const resetHandler=()=>{
        setUserPwd({
            currentPwd:'',
            newPwd:'',
            confirmPwd:''
        })
    }
    const submitHandler=(e)=>{
         e.preventDefault();
            if(userPwd.currentPwd===''||userPwd.newPwd===''||userPwd.confirmPwd===''){
                toast.error('Please enter all the fields')
                return;
            }
            else if(userPwd.newPwd!==userPwd.confirmPwd){
                toast.error('New password and Confirm password should be same')
                return;
            }
            //submit the data to server
            console.log(userPwd)
             const response= privateAxios.post('/auth/ChangePassword',userPwd).then((response)=>{
                if(response.status===200){
                    if(response.data.statusCode===200){
                        toast.success("Password updated successfully!!")
                        setUserPwd({
                            currentPwd:'',
                            newPwd:'',
                            confirmPwd:''
                        })
                    }
                    else{
                        toast.error(response.data.message)
                    }
                }
             })
             .catch((error)=>{  
                if(error.response.status ===400){
                    console.log(error.response.data);
                    setValidations(error.response.data);
                }
                else{
                    console.log(error);
                    toast.error(`error ${error}`)
                }
             })

    }
    return (
        <div>
         <Menu/>
            <div className='p-4 w-50 mx-auto' style={{ border: '1px solid black', marginTop: '70px', marginBottom: '70px' }} >
            <form method='post' onSubmit={submitHandler}>
                <h5 className='text-center text-primary text-underline'>Change password</h5>
                <label>Current password:</label>
                <input type='password' className='form-control' name='currentPwd' value={userPwd.currentPwd} onChange={e=>handleChange(e,'currentPwd')}/>
                <div className='text-danger' style={{fontSize:'12px'}}><b>{valiadations.currentPwd}</b></div>
                <label>New password:</label>
                <input type='password' className='form-control' name='newPwd' value={userPwd.newPwd} onChange={e=>handleChange(e,'newPwd')}/>
                <div className='text-danger' style={{fontSize:'12px'}}><b>{valiadations.newPwd}</b></div>
                <label>Confirm password</label>
                <input type='password' className='form-control' name='confirmPwd' value={userPwd.confirmPwd} onChange={e=>handleChange(e,'confirmPwd')}/>
                <div className='text-danger' style={{fontSize:'12px'}}><b>{valiadations.passwordConfirmed}</b></div>
                <div className='text-center'>
                <Button type='submit' style={{background:'#5cb85c',marginRight:'25px'}}>Change Password</Button>
                <Button style={{background:'#5cb85c'}} onClick={resetHandler}>Clear</Button>
                </div>
            </form>
        </div>
        </div>
    )
}
