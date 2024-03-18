import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function RegistrationPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let navigate = useNavigate();

    const handleRegister =(ev) => {
        ev.preventDefault();
        let payload = {
            username,email,password,confirmPassword
        }
        if(!username || !email || !password || !confirmPassword){
            alert("To register Fill all the fields..!")
        }
        else{
            if(password === confirmPassword ){
                axios.post('http://localhost:4030/register', payload)
            .then((e)=>{
                alert(e.data);
                navigate("/")
            })
            .catch((e)=>{
                alert("problem in sending data to the Backend.! Try again!!");
            })
            }
            else{
                alert("Both password should be matched..")
            }
            
        }
    }

    return (
    <div className='bg-blue-50 h-screen flex items-center'>
        <form className="w-64 mx-auto mb-12" onSubmit={handleRegister}>
        <div className="m-4 px-8 font-bold underline rounded-2xl text-2xl">Register Form</div>
            <input type="text" 
                value={username} 
                onChange={ev => setUsername(ev.target.value)} 
                placeholder="Username" className="block w-full rounded-2xl p-2 mb-2 border"
                required
                />
             <input type="text" 
                value={email} 
                onChange={ev => setEmail(ev.target.value)} 
                placeholder="Email" className="block w-full rounded-2xl p-2 mb-2 border"
                />
            <input type="text" 
                value={password} 
                onChange={ev => setPassword(ev.target.value)} 
                placeholder="Password" className="block w-full rounded-2xl p-2 mb-2 border"/>
            <input type="text" 
                value={confirmPassword} 
                onChange={ev => setConfirmPassword(ev.target.value)} 
                placeholder="Retype Password" className="block w-full rounded-2xl p-2 mb-2 border"/>
            <button className="bg-blue-500 text-white block w-full rounded-2xl p-2">Register</button>
            <div className="flex gap-1 mt-2 justify-center items-center">
                <div>Already have an account?</div>
                <Link to='/' className="border bg-red-500 text-white rounded-2xl p-1"> Sign In</Link>
            </div>
        </form>
    </div>
    );
}