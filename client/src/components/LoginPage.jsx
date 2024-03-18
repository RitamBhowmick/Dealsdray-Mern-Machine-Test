import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin=()=>{
    const payload = {email, password}
    axios.post('http://localhost:4030/login', payload)
    .then((e)=>{
        if(e.data.status == "success"){
            navigate(`/dashboard/${e.data.id}`)
        }
        else if(e.data.status == "fail"){
            alert("Wrong Password!!!");
        }
        else if(e.data.status == "noUser"){
            alert("Invalid Email");
        }
    });
}

    return (
        /*
        <div>
            <div className=' max-w-[940px]  h-[450px] border-4 border-blue-900 mx-auto shadow-xl scale-75 p-[30px]'>
                <h1 className='text-center font-bold text-2xl my-3'>Login Form</h1>
                <div className='border border-red-600 max-w-[300px] mx-auto my-5 p-10'> 
                    <input className='bg-yellow-200 border-2 border-violet-400 text-black my-3 placeholder-black ' 
                    placeholder='Email' type="text" 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)} />
                <br />
                <input className='bg-yellow-200 border-2 border-violet-400 text-black my-3 placeholder-black' 
                    placeholder='Password' type="text" 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}/>
                <button className='bg-red-300 ml-5 rounded-lg p-1' onClick={handleLogin}>LOGIN</button>
                <br />
                <p>do not have Account? <Link to='/register'> Sign Up</Link> </p>
                </div>
            </div>
        </div>
    */
   
        <div className="flex justify-center items-center h-screen bg-blue-50">
            <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-3xl block text-center font-semibold">Login Page</h1>
                <hr className="mt-3" />
                <div className="mt-3">
                    <label htmlFor="email" className="block text-base mb-2">Email</label>
                    <input type="text" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)}
                        className="border border-indigo-700 w-full rounded-2xl text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="block text-base mb-2">Password</label>
                    <input type="text" 
                        placeholder="Enter Password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}
                        className="border border-indigo-700 w-full rounded-2xl text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    />
                </div>
                <div className="mt-5">
                    <button onClick={handleLogin} className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-2xl hover:bg-transparent hover:text-indigo-700 font-semibold">Login</button>
                </div>
                <div className="flex gap-20">
                <div className="mt-2.5 w-1/1.5">
                    <p>Do not have an Account?</p>
                </div>
                <div className="mt-3">
                    <Link to='/register' className="bg-red-500 text-white  px-2 py-1 rounded-2xl">Sign Up</Link>
                </div>
                </div>
            </div>
        </div>
    );

}