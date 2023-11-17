import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const PORT = 'http://localhost:8000';
    const navigate = useNavigate();

    const checkLogin = () => {

        fetch(`${PORT}/auth/checklogin`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }

        }).then((res) => {
            if (res.status === 401 || res.status === 404) {
                navigate('/login')

            }
            console.log(res.status);
        }).catch((err) => {
            console.log(err)
        })

    }
    useEffect(() => {
        checkLogin();
    })

    return (
        <div>welcome to Home</div>
    )
}

export default Home