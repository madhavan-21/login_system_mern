import React from 'react'
import './Register.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {
    const [register, setRegister] = useState({ name: "", email: "", password: "" });
    const PORT = 'http://localhost:8000';
    const navigate = useNavigate();

    const handleRegister = () => {
        fetch(`${PORT}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(register)
        }).then((res) => {
            console.log("register successfully")
            if (res.status === 200 || res.status === 201) {
                navigate('/login');

            }
            console.log(res.status);


        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div>
            <div className='registerForm'>
                <div className='reg_data'>
                    <div className='Name'>
                        <span>Name</span>
                        <input type='text' onChange={(e) => { setRegister({ ...register, name: e.target.value }) }} />
                    </div>
                    <div className='email'>
                        <span>email</span>
                        <input type='email' onChange={(e) => {
                            setRegister({ ...register, email: e.target.value })
                        }} />
                    </div>
                    <div className='password'>
                        <span>password</span>
                        <input type='password' onChange={(e) => {
                            setRegister({ ...register, password: e.target.value })
                        }} />
                    </div>
                    <button className='registerButton' onClick={handleRegister}>
                        Register
                    </button>
                    <div>
                        Already have a account ? <Link to="/">login</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register