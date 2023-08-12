import React from 'react'
import {Form, Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const onfinishHandler = async (values)=>{
    try {
      const res = await axios.post('/api/auth/signup',values)
      if(res.data.success){
        message.success('Register Successfully')
        navigate('/login')
      }
      else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      message.error('Something went wrong')
    }
  }
  return (
    <>
       <div className="form-container">
        <Form style={{padding:"1rem"}} layout='vertical' className='register-form' onFinish={onfinishHandler}>
        <h2 className='text-center'>Signup</h2>
            
        <Form.Item  label="Name" name="name">
        <Input type="text" placeholder='Enter your name' required />
        </Form.Item>
            
            
        <Form.Item label="Username" name='username'>
        <Input type="text" required placeholder='Enter your username' autoComplete='username' />
        </Form.Item>
            
           
        <Form.Item label="Email" name='email'>
        <Input type="text" required placeholder='Enter your Email' />
        </Form.Item>
           
            
            <Form.Item label="Password" name='password'>
            <Input type="password" required autoComplete='current-password' />
            </Form.Item>
        <Form.Item label="Bio" name='bio'>
        <Input type="text" id='bio' placeholder='Enter your Bio' />
        </Form.Item>
            <button type='submit'>Sign Up</button>
            <Link to='/'>Forget Password ?</Link>
            <Link to='/login'>Log In</Link>

        </Form>
      </div>
    </>
  )
}

export default Register
