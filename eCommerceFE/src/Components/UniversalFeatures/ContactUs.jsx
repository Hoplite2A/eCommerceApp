//! Imported Libraries --------------------------
import { useRef } from 'react';
// import { emailjs } from '@emailjs/browser';
// import './EmailForm.css';
// import { Link } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "./Navigation/Header";
import Footer from './Footer';
//! ---------------------------------------------

export default function EmailForm() {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_82xldeo', 'template_ID', form.current, 'public_key')
            .then((result) => {
                console.log(result.text);
                console.log("message sent!")
            }, (error) => {
                console.log(error.text);
                console.log("error sending message, try again!")
            });
        };
    
    return (<>
        <Header />
        <div className="contactUsDic">
            <form ref={form} onSubmit={sendEmail}>
                <input name='user_email' type="email" placeholder='Email' required />
                <textarea name='user_message' placeholder='Write message...' required ></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
        <Footer />
    </>)
}