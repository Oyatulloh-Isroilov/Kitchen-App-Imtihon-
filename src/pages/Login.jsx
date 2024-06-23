import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/components.css';
import videoBg from '../assets/videos/loginBg.mp4';
import { Link, useNavigate } from 'react-router-dom';
import google from '../assets/images/google.webp';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="loginContainer">
            <video className='bgVideo' src={videoBg} autoPlay loop muted />
            <div className="login"> 
                <div className="loginBar">
                    <h3 className='loginText'>Login</h3>
                    <div className="loginAccInps">
                        <input type="email" id="email" placeholder='example@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="loginButtons">
                        <button className='loginBtn' onClick={handleLogin}>Login</button>
                        <button className='loginGoogleBtn' onClick={handleGoogleLogin}><img className='googleIcon' src={google} alt="google icon" />Google</button>
                        <div className="accNoHave">
                            <span>You do not have an account?</span><Link to="/signup">Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
