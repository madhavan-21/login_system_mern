import React from 'react'
import { useState } from 'react'
import './Login.css';
import { Link , useNavigate } from "react-router-dom";

const Login = () => {

    const [login, setlogin] = useState({ email: " ", password: " " })

    const PORT = 'http://localhost:8000';    
    const navigate = useNavigate();

    const registerhandler = () => {

        fetch(`${PORT}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login)
        }).then((res) => {
            if(res.status === 200 || res.status === 201 ){
                navigate('/home');
            }
        }).catch((err) => {
            console.log(err)
        })

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
                    don't have a account ? <Link to="/register">register</Link>
                </div>



            </div>
        </div>
    )
}

export default Login