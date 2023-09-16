import React from 'react'
import { useState, useEffect } from 'react'
import './Login.css';
const Login = () => {

    const [login, setlogin] = useState({ email: " ", password: " " })

    const registerhandler = () => {
        console.log(login);
    }

    return (
        <div className='login_Page'>
            <div className='login_data'>
                <div className='email'>
                    <span>email</span>
                    <input type='email' onChange={(e) => { setlogin({ ...login, email: e.target.value }) }} />
                </div>
                <div className='password'>
                    <span>password</span>
                    <input type='password' onChange={(e) => { setlogin({ ...login, password: e.target.value }) }} />
                </div>
                <button className='registerButton' onClick={registerhandler}>
                    login
                </button>
                <div>
                    Already have a account <button >Register</button>
                </div>



            </div>
        </div>
    )
}

export default Login