import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/components.css';
import videoBg from '../assets/videos/signupBg.mp4';
import { Link, useNavigate } from 'react-router-dom';
import google from '../assets/images/google.webp';

function Signup() {
    const [username, setUsername] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: username,
                photoURL: imgUrl,
            });

            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="signupContainer">
                <video className='bgVideo' src={videoBg} autoPlay loop muted />
            <div className="signup">
                <div className="signupBar">
                    <h3 className='signupText'>Signup</h3>
                    <div className="createAccInps">
                        <input type="text" id='username' name="username" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" id='imgUrl' name="imgUrl" placeholder="Photo URL" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                        <input type="email" id="email" placeholder='example@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="signupButtons">
                        <button className='signupBtn' onClick={handleSignup}>Signup</button>
                        <button className='signupGoogleBtn' onClick={handleGoogleSignup}><img className='googleIcon' src={google} alt="google icon" />Google</button>
                        <div className="accNoHave">
                            <span>Already have an account?</span><Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
