import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function CreateEmployee(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [designation, setDesignation] = useState();
    const [gender, setGender] = useState("");
    const [image, setImage] = useState();
    const [course, setCourse] = useState('');
    const navigate = useNavigate();

    const formHandle = (ev) => {
        ev.preventDefault()
        let payload = {
            name: name,
            email: email,
            phone: phone,
            designation: designation,
            gender: gender,
            image: image,
            course: course
        }

        if (!name || !email || !phone || !designation || !gender || !image || !course) {
            alert("To Create Employee Fill all the fields..!")
        }
        else {
            axios.post("http://localhost:4030/employees", payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((e) => { alert(e.data) })
                .catch(() => { console.log("can not register"); })

            navigate("/employee-list")
        }}


    return (
        <div className='h-screen bg-blue-50 border-4 border-blue-900 mx-auto relative shadow-xl '>
                <h1 className='text-center font-bold text-2xl my-3'>Create Employee</h1>
                <div className='border border-red-600 max-w-[300px] mx-auto my-5 p-8'>
                <div className='mt-2'>
                <label className="block">Name:</label>
                    <input className='bg-white border-2 border-violet-300 text-black mt-2 mb-4 placeholder-black ' 
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
                    <label htmlFor="" className="block text-base mb-2">Designation:</label>
                    <select onChange={(ev) => { setDesignation(ev.target.value); }} 
                        name='designation' 
                        required 
                        className="block appearance-auto w-full bg-white border-2  hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-2 border-violet-300">
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>

                    {/* Gender radio button */}
                    <label htmlFor="" className=" text-base mt-6">Gender : </label><br />
                    <div className='mt-1'>
                    <input type="radio" id="male" name="gender" value={gender} onChange={(ev) => { setGender("Male") }} />
                    <label htmlFor="male"> Male </label>
                    <input type="radio" id="female" name="gender" value={gender} onChange={(ev) => { setGender("Female") }} />
                    <label htmlFor="female"> Female </label><br></br>
                    </div>

                    {/* Courses check boxes */}
                    <label htmlFor="" className=" text-base mt-6">Course :</label><br />
                    <div className='mt-1'>
                    <input type="radio" id="MCA" name="course" value="MCA" checked={course == 'MCA'} onChange={ev => setCourse(ev.target.value)} />
                    <label htmlFor="MCA"> MCA </label>
                    <input type="radio" id="BCA" name="course" value="BCA" checked={course == 'BCA'} onChange={ev => setCourse(ev.target.value)} />
                    <label htmlFor="BCA"> BCA </label>
                    <input type="radio" id="BSC" name="course" value="BSC" checked={course == 'BSC'} onChange={ev => setCourse(ev.target.value)} />
                    <label htmlFor="BSC"> BSC </label>
                    </div>

                    {/* file upload */}
                    <label htmlFor="" className="block mt-2 -mb-4">Upload Your Photo:</label><br />
                    <input className='' accept="image/jpeg, image/png" type="file" name='image' onChange={(ev) => { setImage(ev.target.files?.[0]) }} /><br />
                    <div className='mt-6 '>
                    <button className='border border-red-700 bg-red-500 text-white rounded-lg p-1 w-full hover:bg-transparent hover:text-red-700' onClick={formHandle}>Register Me</button>
                    </div>
                </div>

            </div>
    );
}