import classes from './Login.module.css';
import React, { FormEvent, useContext, useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PersonDetailsContext } from '../../../contexts/ContextPerson';
import { configs } from '../../../constants/configs';

const Login = () => {
    const [errorMessages, setErrorMessages] = useState({ name: '', message: '' });
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();

    // Error Values
    const errors = {
        errorMail: "invalid Mail",
        errorPass: "invalid password",
        errorLogin: "wrong credential"
    };

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const { setDetails } = useContext(PersonDetailsContext);

    // useEffect(() => {
    //     setIsDisabled(!isPasswordValid());
    // }, [emailRef,passwordRef])

    const isPasswordValid = (): boolean => {
        const validPasswordRegex: RegExp = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9])(.{8,})$/;

        const password: string = passwordRef.current.value;
        return validPasswordRegex.test(password);
    }

    const isMailValid = (): boolean => {
        const validEmailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        const email: string = emailRef.current.value;
        return validEmailRegex.test(email)
    }

    const login = async () => {
        const body = { email: emailRef!.current.value, pass: passwordRef!.current.value };
        return await axios.post(`${configs.serverURL}/authenticate`, body).then(res => {
            return res.data[0];
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!isMailValid()) {
            setErrorMessages({ name: "mail", message: errors.errorMail });
            return;
        }

        if (!isPasswordValid()) {
            setErrorMessages({ name: "password", message: errors.errorPass });
            return;
        }

        await login().then((data: any) => {
            if (data == null) {
                alert(errors.errorLogin);
                return;
            }

            setDetails(data.personalDetails);
            localStorage.setItem("token", data.token);
        });


        navigate('/Info');
    }

    // Generate code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className={classes.error}>{errorMessages.message}</div>
        );

    return (
        <div className={classes.page}>
            <div className={classes["login-form"]}>
                <div className="title">Sign In</div>
                <div className={classes.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes["input-container"]}>
                            <label htmlFor="email">email</label>
                            <input ref={emailRef} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                            {renderErrorMessage("mail")}
                        </div>
                        <div className={classes["input-container"]}>
                            <label htmlFor="password">password</label>
                            <input ref={passwordRef} type="password" placeholder="********" id="password" name="password" />
                            {renderErrorMessage("password")}
                        </div>
                        <div className={classes["button-container"]}>
                            <button disabled={isDisabled} type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;