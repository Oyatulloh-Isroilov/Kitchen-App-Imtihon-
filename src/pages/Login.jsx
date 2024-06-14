import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase'; 
import '../styles/components.css';
import videoBg from '../assets/videos/bgVideo.mp4';
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
        <div className="login">
            <video className='bgVideo' src={videoBg} autoPlay loop muted />
            <div className="signupBar">
                <h3 className='signupText'>Login</h3>
                <div className="createAccInps">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder='example@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className="error">{error}</p>}
                <div className="signupButtons">
                    <button className='loginBtn' onClick={handleLogin}>Login</button>
                    <button className='loginGoogleBtn' onClick={handleGoogleLogin}><img className='googleIcon' src={google} alt="google icon" />Google</button>
                    <Link to="/signup">I have no account yet</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
