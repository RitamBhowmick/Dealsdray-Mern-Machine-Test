import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EmployeeListPage() {
    const [infoFromDb, setinfoFromDb] = useState([]);
    const [reload, setReload] = useState(0);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState("ASC");

    useEffect(()=>{
        axios.get("http://localhost:4030/employee-list")
        .then((e)=>{
                setinfoFromDb(e.data)
            })
         .catch((e)=>{
                console.log("error from EmployeeList useEffect");
            })
            setReload(1)
        
    },[reload])

    const sorting = (ev) => {
      if(sort === "ASC"){
      const sorted = [...infoFromDb].sort((a, b) => 
      a[ev].toLowerCase() > b[ev].toLowerCase() ? 1 : -1
      );
      setinfoFromDb(sorted);
      setSort("DESC");
      }
      if(sort === "DESC"){
        const sorted = [...infoFromDb].sort((a, b) => 
        a[ev].toLowerCase() < b[ev].toLowerCase() ? 1 : -1
        );
        setinfoFromDb(sorted);
        setSort("ASC");
        }
    };

    const deleteUser = (ev)=>{
      axios.delete(`http://localhost:4030/employee-list/${ev}`)
      setReload(2)
    }

    return (
    <div className='bg-blue-100 h-screen'>
      <div className='flex border bg-red-300 pb-4'>
        <p className='flex gap-10 mx-auto items-center underline text-2xl font-bold'>Total Count : {infoFromDb.length}</p>
      </div>
        <div className='flex mx-auto justify-between'>
        <div className=''>
        <form className='ml-2 border-2 border-black'>
          <input type='text' 
            placeholder='Search...'
            onChange={ev => setSearch(ev.target.value)}
            />
        </form>
        </div>
        <div className='flex justify-end items-end'>
          <div className='border-2 border-black mr-4 p-1 rounded-xl'>Click to Sort:</div>
          <div className='border-2 border-black p-1 rounded-sm'><button className='cursor-pointer' onClick={() => sorting("name")}>By Name</button></div>
          <div className='border-2 border-black p-1 rounded-sm'><button className='cursor-pointer' onClick={() => sorting("email")}>By Email</button></div>
        </div>
      </div>
       <table className='w-full bg-blue-50'>
       <thead className='border border-black w-screen'>
          <tr className='border-black bg-red-300'>
            <th className='px-7 py-2'>Unique Id</th>
            <th className='px-7 py-2'>Image</th>
            <th className='px-7 py-2'>Name</th>
            <th className='px-7 py-2'>Email</th>
            <th className='px-7 py-2'>Phone</th>
            <th className='px-7 py-2'>Designation</th>
            <th className='px-7 py-2'>Gender</th>
            <th className='px-7 py-2'>Course</th>
            <th className='px-12 py-2'>Action</th>
          </tr>
        </thead>
        <tbody className='text-center text-[15px]'>
          {infoFromDb.filter((item) => {
            return search.toLowerCase() === '' ? item : item.name.includes(search);
          }).map((item,i) => (
            <tr key={item.id}>
              <td className='border-2 border-green-700'>{i+1}</td>
              <td className='border-2 border-green-700'><img src={`api/Images/${item.image}`}/></td>
              <td className='border-2 border-green-700'>{item.name}</td>
              <td className='border-2 border-green-700'>{item.email}</td>
              <td className='border-2 border-green-700'>{item.phone}</td>
              <td className='border-2 border-green-700'>{item.designation}</td>
              <td className='border-2 border-green-700'>{item.gender}</td>
              <td className='border-2 border-green-700'>{item.course}</td>
              <td className='border-2 border-green-700'>
                <Link  to={`/edit-employee/${item._id}`}>Edit - </Link>
                <button  onClick={()=>{deleteUser(item._id)}}> Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
    </div>
    );
}