import React,{useEffect} from 'react'
import {message} from 'antd'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import me from '../asset/me.jpg'

const User = () => {
  const getUserData= async () => {
    try {
      const res = await axios.get('/api/auth/user',{},{
        headers:{
          Authorization:"Bearer " + localStorage.getItem('token'),
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, [])
  

  return (
    <section className='main-section' >
    <div className='user'>
      <img src={me} alt="profile" />
      <h2>Username</h2>
      <p>Bio</p>
      <p className='email-p'>Emailid</p>
      <p className='followers-p'>Followers: 1000</p>
    
    </div>
    </section>
  )
}

export default User
