import React from 'react'
import {Form, Input,message} from 'antd'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'

const Log = () => {
  const navigate = useNavigate()
  const onfinishHandler = async (values)=>{
    try {
      const res = await axios.post('/api/auth/signin',values)
      if(res.data.success){
        localStorage.setItem('token',res.data.token)
        message.success('Login Successfull')
        navigate('/')
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      message.error('Something went wrong')
    }
  }
  return (
    <>
    <div className="form-container">
        <Form style={{padding:"1rem"}} layout='vertical' className='register-form' onFinish={onfinishHandler}>
        <h2 className='text-center'>Login</h2>
            
        <Form.Item label="Username" name='username'>
        <Input type="text" required placeholder='Enter your username' autoComplete='username' />
        </Form.Item>
            
            <Form.Item label="Password" name='password'>
            <Input type="password" required autoComplete='current-password' />
            </Form.Item>
            <button type='submit'>Log In</button>
            <Link to='/'>Forget Password ?</Link>
            <Link to='/register'>Sign Up</Link>

        </Form>
      </div>
    </>
  )
}

export default Log
