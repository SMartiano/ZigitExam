import classes from './Login.module.css';
import { FormEvent, useContext, useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PersonDetailsContext } from '../../../contexts/ContextPerson';
import { configs } from '../../../constants/configs';
import { Button, Input } from '@mui/material';

const Login = () => {
    const [errorMessages, setErrorMessages] = useState({ name: '', message: '' });
    const [isDisabled, setIsDisabled] = useState(true);
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
            return res.data ? 
                res.data[0] : null;
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

        const data: any = await login();
        if (data == null) {
            alert(errors.errorLogin);
            return;
        }

        setDetails(data.personalDetails);
        localStorage.setItem("token", data.token);

        navigate('/Info');
    }

    const enableSubmit = () => {
        setIsDisabled(!isMailValid() || !isPasswordValid());
    }

    // Generate code for error message
    const renderErrorMessage = (name) => {
        return name === errorMessages.name && (
            <div className={classes.error}>{errorMessages.message}</div>
        );
    }

    return (
        <div className={classes.page}>
            <div className={classes["login-form"]}>
                <div className="title">Sign In</div>
                <div className={classes.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes["input-container"]}>
                            <label htmlFor="email">email</label>
                            <Input inputRef={emailRef} onChange={() => enableSubmit()} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                            {renderErrorMessage("mail")}
                        </div>
                        <div className={classes["input-container"]}>
                            <label htmlFor="password">password</label>
                            <Input inputRef={passwordRef} onChange={() => enableSubmit()} type="password" placeholder="********" id="password" name="password" />
                            {renderErrorMessage("password")}
                        </div>
                        <div className={classes["button-container"]}>
                            <Button disabled={isDisabled} type="submit">Log In</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;