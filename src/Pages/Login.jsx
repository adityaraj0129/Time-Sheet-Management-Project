import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Login = () => {
     const navigate=useNavigate();

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    // Check User and Password from backend API
    const handleSubmit=async(e)=>{
        e.preventDefault(); 
        try{
            const fetchData=await axios.post('',{email,password});
           if(fetchData.data){
            toast.success('User Logged in Succefully');
             navigate('/timesheettable');
           }else{
            toast.error(Response.data.mesage||'Login failed');
           }
        } catch(error){
                toast.error('Something went wrong')
            }
    };
  return (<>
  <div><Toaster/></div>
    <div className='min-h-screen flex flex-col md:flex-row'>
        {/* Left Section --Form */}
        <div className='flex-1 flex items-center justify-center p-8'>
           <div className='w-full max-w-sm space-y-6'>
            <h2 className='text-3xl font-semibold text-gray-800'>Welcome back</h2>

             <form action="" onSubmit={handleSubmit} className='space-y-5'>
                <label htmlFor="email" className='block text-sm font-medium text-gray'>Email</label>
                <input type="email" id='email' value={email} placeholder='name@gmail.com' onChange={(e)=>setEmail(e.target.value)} className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 ficus:ring-blue-500' required />

                <label htmlFor="password" className='block text-sm font-medium text-gray'>Password</label>
                <input type="password" id='password' value={password} placeholder='' onChange={(e)=>setPassword(e.target.value)} className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 ficus:ring-blue-500' required />

                <div className='flex items-center justify-between'>
                    <label htmlFor="" className='flex items-center space-x-2'>
                        <input type="checkbox" className='h-4 w-4 text-blue-600' />
                        <span className='text-sm text-gray-700'>Remember me</span>
                    </label>
                </div>
                <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:blue-700 transition'>Sign In</button>
            </form>
           </div>
        </div>
{/* Right Section  */}
        <div className='flex-1 bg-blue-600 text-white flex items-center justify-center p-8'>
            <div className='max-w-md space-y-4'>
                <h2 className='text-3xl font-bold'>ticktock</h2>
                <p className='text-lg leading-relax'>Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendence attendence and productivity from anywhere, anytime, using any internet-connected device</p>
            </div>
        </div>
    </div></>
  )
}

export default Login