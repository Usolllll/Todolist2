import { Button, Divider } from "antd";
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import './register.css'
import axios from 'axios';

function Register(){
  const[account,setAccount]=useState('')
  const[password,setPassword]=useState('')

    const handleRegister = () => {
      const formData = {
        account: account,
        password: password
      };
      axios.post('http://localhost:80/register', formData)
        .then(response => {
          console.log('Registration successful:', response.data);
          alert('注册成功');
          window.location.href = 'http://localhost:3000/LogIn';
        })
        .catch(error => {
          console.error('Error registering:', error);
          alert('账号已注册');
        });
    };


  
  return (
    <div>
<div className='input_block'>
<input type='text' className='inputAccount' placeholder="输入账号" value={account} onChange={(e)=>setAccount(e.target.value)}></input>
</div>
<div className='input_block'>
<input type='text' className='inputPassword' placeholder="输入密码" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
</div>
<div className='input_block'>
<Button type="primary" onClick={handleRegister} >注册</Button>
</div>
    </div>
  )
  }
  export default Register;