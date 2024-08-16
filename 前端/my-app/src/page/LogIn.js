import { Button, Divider } from "antd";
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import './LogIn.css'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

function LogIn(){
  const navigate=useNavigate()
  const[account,setAccount]=useState('')
  const[password,setPassword]=useState('')

  const handleSubmit = async () => {  
    try {  
      const response = await axios.post('http://localhost/LogIn', {  
        account,  
        password,  
      });  
      if (response.data.success) {  
        localStorage.setItem('token', response.data.token);
        navigate (`/AfterLogIn?account=${response.data.token}&password=${password}`);  
      } else {  
        alert('登录失败，请检查账号和密码');  
      }  
    } catch (error) {  
      console.error('登录请求失败:', error);  
      alert('账号密码错误');  
    }  
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
<Button type="primary" className="login" onClick={handleSubmit}>登录</Button>
</div>
 </div>
)
}
export default LogIn;