import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function DashBoard() {
    const [username, setUsername] = useState("");
    const ID = useParams();
    const navigate = useNavigate();

    const logout = () => {
      axios.post('/logout');
      navigate('/');
      setUsername(null);
    }

    useEffect(()=>{
        axios.get(`http://localhost:4030/user/${ID.ID}`)
        .then((e)=>{
          setUsername(e.data)
        })
        .catch(() => {
            console.log("Unable to fetch data in Edit comp");
        })
    },[])

    return (
    /*<div className='flex'>
    <div>
      <div id='navbar' className='bg-gray-300  '>
        <ul className='flex gap-24 px-10'>
          <li>Home</li>
          <li><Link to='/create-employee'> Create Employee</Link> </li>
          <li><Link to="/employee-list">  Employee list </Link> </li>
          <li className='p-2 text-red-500 border border-dashed border-red-400 '>{username}</li>
        </ul>
        
      </div>
      <h1 className='bg-yellow-200'>DashBord</h1>
      <p>Welcome to Admin Panel</p>
    </div>
    <button onClick={logout} className="bg-red-500 text-white max-w-sm mb-14 mr-0 p-1.5 rounded-2xl">Logout</button>
    </div>
    */
   <>
    <div className='bg-red-200 h-screen'>
    <div className='flex bg-blue-300 p-5 '>
      <ul className='flex gap-10 mx-auto items-center'>
        <li className='border border-red-300 bg-red-300 rounded-2xl py-1 px-4 hover:bg-transparent hover:text-red-700 font-semibold'>Home</li>
        <li className='border border-red-300 bg-red-300 rounded-2xl py-1 px-4 hover:bg-transparent hover:text-red-700 font-semibold'><Link to='/create-employee'> Create Employee</Link> </li>
        <li className='border border-red-300 bg-red-300 rounded-2xl py-1 px-4 hover:bg-transparent hover:text-red-700 font-semibold'><Link to="/employee-list">  Employee list </Link> </li>
      </ul>
      <button onClick={logout} className='border border-red-700 bg-red-500 text-white py-1 px-4 rounded-2xl hover:bg-transparent hover:text-red-700 font-semibold'>Logout</button>
    </div>
    <div className='flex
    '>
    </div>
    <div className='flex justify-center'>
      <div className='w-1/2 p-4'>
        <p className='text-center'>Welcome to Admin Panel {username} !!!</p>
      </div>
    </div>
    </div>
   </>
    );
}