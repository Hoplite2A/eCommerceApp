//! Imported Libraries -------------------------
import { Link } from 'react-router-dom';
import { signal } from "@preact/signals-react";
import { useState, useEffect } from 'react';
//! --------------------------------------------

//! Imported Components ------------------------
import { companyName } from '../UniversalFeatures/Logo';
//! --------------------------------------------

export const token = signal(null);
console.log(`Token Value Prior to Login: ${token.value}`);

export default function Login() {
    
    const [user,setUser] = useState(null);
    const [pass,setPass] = useState(null);

    const handleLogin = async (e) => {

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
            token.value = json.token;
        } catch (err) {
            console.log(`Login funciton error durring handleLogin`, err);
            alert(err);
        }
    }
    
    console.log(`Token Value after Login: ${token.value}`);

    return (<>
        <form action="" className="loginForm">
            <h2 className="loginMessage">Login Here!</h2>
            <div className="formFields">
                <label htmlFor="user">
                    <input type="text" id='user' name='user' placeholder='User Name' onClick={() => {
                        setUser(e.target.value);
                    }} />
                </label>
                <label htmlFor="pass">
                    <input type="text" id='pass' name='pass' placeholder='Password' onClick={() => {
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