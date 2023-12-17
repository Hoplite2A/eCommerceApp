/* eslint-disable react-refresh/only-export-components */
//! Imported Libraries -------------------------
import { Link, useNavigate } from 'react-router-dom';
import { signal } from "@preact/signals-react";
import { useState } from 'react';
//! --------------------------------------------

//! Imported Components ------------------------
import { companyName } from '../UniversalFeatures/Logo';
//! --------------------------------------------

export const token = signal(null);
console.log(`Token Value Prior to Login: ${token.value}`);

export default function Login() {
    
    const [user,setUser] = useState(null);
    const [pass,setPass] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: user,
                    passworkd: pass,
                })
            })
            const json = res.json();
            const authToken = json.token;
            token.value = authToken;
        } catch (err) {
            console.log(`Login funciton error durring handleSubmit`, err);
            alert(err);
        }

        if (token.value !== null) {
            navigate('/')
        } else { 
            navigate('/login')
        }
    }

    console.log(`Token Value after Login: ${token.value}`);

    return (<>
        <form className="loginForm" onSubmit={handleSubmit}>
            <h2 className="loginMessage">Login Here!</h2>
            <div className="formFields">
                <label className='loginLabels'>
                    <input className='loginInputs' type="text" id='user' name='user' placeholder='User Name' onChange={(e) => {
                        setUser(e.target.value);
                    }} />
                </label>
                <label className='loginLabels'>
                    <input className='loginInputs' type="text" id='pass' name='pass' placeholder='Password' onChange={(e) => {
                        setPass(e.target.value);
                    }} />
                </label>
            </div>
            <button type='submit'>Login</button>
        </form>
        <div className="newUser">
            <p className="newUserMessage">
                New to {companyName}? Sign up and start exploring all the benefits!
            </p>
            <Link to='/SignUp'>
                <button>Sign Up</button>
            </Link>
        </div>
    </>)

}