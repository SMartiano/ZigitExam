import classes from './Login.module.css';
import React, { FormEvent, useContext, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PersonDetailsContext } from '../../../contexts/ContextPerson';
import { configs } from '../../../constants/configs';

const Login = () => {
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const {setDetails} = useContext(PersonDetailsContext);

    const getUsers = async () => {
        const body = { email: emailRef!.current.value, pass: passwordRef!.current.value };
        return await axios.post(`${configs.serverURL}/authenticate`, body).then(res => {
            return res.data[0];
        });
    };

    const validateCreds = (): boolean => {
        const validEmailRegex: RegExp = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
        const validPasswordRegex: RegExp = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9])(.{8,})$/;
        
        const email: string = emailRef.current.value;
        const password: string = passwordRef.current.value;

        return validEmailRegex.test(email) && validPasswordRegex.test(password);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateCreds()) {
            alert('Creds not valid');
            return;
        }

        // Check Fields
        await getUsers().then((data:any) => {
            // Check if exists
            setDetails(data.personalDetails);
            localStorage.setItem("token", JSON.stringify(data.token));
        });

        
        navigate('/Info');
    }

    return (
        <div className={classes.app}>
            <div className={classes["login-form"]}>
                <div className="title">Sign In</div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label htmlFor="email">email</label>
                            <input ref={emailRef} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="password">password</label>
                            <input ref={passwordRef} type="password" placeholder="********" id="password" name="password" />
                        </div>
                        <div className="button-container">
                            <button type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;