import React from 'react'
import './Register.css'
import { useEffect, useState } from 'react'
import Login from './Login';

const Register = () => {
    const [register, setRegister] = useState({ name: "", email: "", password: "" });

    const handleRegister = () => {
        console.log(register)
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
                        Already have a account <button onClick={<Login />}>Login</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register