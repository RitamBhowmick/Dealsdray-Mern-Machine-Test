import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditEmployeeList(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [designation, setDesignation] = useState();
    const [gender, setGender] = useState();
    const [courses, setCourses] = useState('');
    const [image, setImage] = useState();

    const idObj = useParams();
    const navigate = useNavigate();
     useEffect(() => {
    axios.get(`http://localhost:4030/employee-list/${idObj.ID}`)
      .then((e) => {
        setName(e.data.name);
        setEmail(e.data.email);
        setPhone(e.data.phone)
        setDesignation(e.data.designation)
        setGender(e.data.gender)
        setCourses(e.data.course)
      })
      .catch(() => { console.log("erro"); })
    }, []);

      const formHandle = (ev) => {
        ev.preventDefault();
        const payload = {
          name: name,
          email: email,
          phone: phone,
          image: image,
          designation: designation,
          gender: gender,
          course: courses
        }
        axios.put(`http://localhost:4030/employee-list/${idObj.ID}`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((e) => { (e.data); })
          .catch(() => { console.log("err "); })
    
        navigate("/employee-list");
      }

    return (
    <div className='h-screen bg-blue-50 border-4 border-blue-900 mx-auto relative shadow-xl]'>
      <h1 className='text-center font-bold text-2xl my-3'>Update Employee Data</h1>
      <div className='border border-red-600 max-w-[300px] mx-auto my-5 p-10'>
      <div>
      <label className="block">Name:</label>
        <input className='bg-white border-2 border-violet-300 text-black my-2 mb-4 placeholder-black ' 
        placeholder='Enter Full Name' 
        type="text" value={name} 
        onChange={(ev) => { setName(ev.target.value) }} />
      </div>
      <div>
      <label className="block ">Email:</label>
        <input className='bg-white border-2 border-violet-300 text-black my-2 mb-4 placeholder-black ' 
        placeholder='Enter Email' 
        type="text" value={email} 
        onChange={(ev) => { setEmail(ev.target.value) }} />
      </div>
      <div>
      <label className="block text-base">Phone Number:</label>
        <input className='bg-white border-2 border-violet-300 text-black my-2 mb-4 placeholder-black ' 
        placeholder='Enter Phone Number' 
        type="text" value={phone} 
        onChange={(ev) => { setPhone(ev.target.value) }} />
      </div>

        {/* designation dropdown */}


        <label htmlFor="" className="block text-base mb-2">Designation</label>
        <select name="gender" 
        value={designation} 
        onChange={(ev) => setDesignation(ev.target.value)} className="block appearance-none w-full bg-white border hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-2 border-violet-300">
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>


        {/* Gender radio button */}

        <label htmlFor="" className='text-base mt-6'>Gender : </label><br />
        <div className='mt-1'>
        <input type="radio" id="male" name="gender" value="Male" checked={gender == 'Male'} onChange={(ev) => setGender(ev.target.value)} />
        <label htmlFor="male"> Male </label>
        <input type="radio" id="female" name="gender" value="Female" checked={gender == 'Female'} onChange={(ev) => setGender(ev.target.value)} />
        <label htmlFor="female"> Female </label><br />
        </div>

        {/* Courses check boxes */}

        <label htmlFor='' className='text-base mt-6'>Course :</label><br />
        <div className='mt-1'>
        <input type="radio" id="MCA" name="course" value="MCA" checked={courses == 'MCA'} onChange={ev => setCourses(ev.target.value)} />
        <label htmlFor="MCA"> MCA </label>
        <input type="radio" id="BCA" name="course" value="BCA" checked={courses == 'BCA'} onChange={ev => setCourses(ev.target.value)} />
        <label htmlFor="BCA"> BCA </label>
        <input type="radio" id="BSC" name="course" value="BSC" checked={courses == 'BSC'} onChange={ev => setCourses(ev.target.value)} />
        <label htmlFor="BSC"> BSC </label>
        </div>


        <label htmlFor="" className="block mt-2 -mb-4">Upload your photo</label><br />
        <input type="file" name='image' onChange={(ev) => { setImage(ev.target.files[0]) }} /><br />
        <div className='mt-6'>
          <button className='border border-red-700 bg-red-500 text-white rounded-lg p-1 w-full hover:bg-transparent hover:text-red-700' onClick={formHandle}> Update Changes</button>
        </div>
      </div>

    </div>
    );
}