'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';




const Login = () => {
  const router = useRouter();
    const [loginData, setLoginData] = useState({
        email:"",
        password:"",
    });
    
    const handleChange=(e)=>{
          setLoginData ({
             ...loginData,
             [e.target.name]: e.target.value,
          });
    };
    const signupClick=()=>{
        router.push('/signup');
    };
      
    const handleClick= async ()=>{
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        if (response.ok) {
          toast.success('User Logged In successfully');
          document.location.reload();
          router.push('/your-tasks');
          
        } else {
          console.error('Failed to Login:', response.statusText);
          toast.error("Invalid email or Password")
        }
      } catch (error) {
        console.error('Error logging in user:', error.message);
        toast.error("failed");
      }
        
    };
  return (  
      <div className="card">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left"></div>
    <div className='flex flex-col items-center justify-center p-8 space-y-4 bg-gray-800 h-screen'>
    <h1 className='text-6xl p-10 text-white card-title'>Login</h1>
    <div className="card-body">
    <label htmlFor='email' className='text-white'>
      Email
    </label>
    <input
      type='email'
      placeholder='Enter email'
      className='px-4 py-2 bg-gray-50 text-black rounded-md'
      id='email'
      name='email'
      onChange={handleChange}
    />

    <label htmlFor='password' className='text-white'>
      Password
    </label>
    <input
      type='password'
      placeholder='Enter password'
      className='px-4 py-2 bg-gray-50 text-black rounded-md'
      id='password'
      name='password'
      onChange={handleChange}
    />

    <button
      className='btn btn-primary px-6 py-3 text-white rounded-3xl  focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200'
      onClick={()=>handleClick()}
    >
      Login
    </button> 
    
    <span><button
      className='btn btn-secondary px-3 py-2 text-white rounded-3xl focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200'
      onClick={()=>signupClick()}
    >
      Sign Up Here
    </button></span></div>
    
  </div>
  </div>
    </div>
  )
};

export default Login;