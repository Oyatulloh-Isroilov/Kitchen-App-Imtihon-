import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/components.css';
import sun from '../assets/images/sun.svg';
import moon from '../assets/images/moon.svg';

function Header({ user }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        auth.signOut();
        navigate('/login');
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="header">
            <div className="headerLogo">
                <h3>Kitchen app</h3>
            </div>
            <div className="headerAccount">
                <button onClick={toggleTheme} className="themeToggle">
                    <img src={theme === 'light' ? moon : sun} alt="theme toggle icon" />
                </button>
                {user && (
                    <>
                        <span onClick={toggleDropdown}>{user.displayName || 'User'}</span>
                        <img
                            src={user.photoURL || 'default-avatar.png'}
                            alt="avatar"
                            onClick={toggleDropdown}
                            style={{ cursor: 'pointer' }}
                        />
                        {dropdownOpen && (
                            <div className="dropdown">
                                <ul>
                                    <li onClick={() => navigate('/')}>Home</li>
                                    <li onClick={() => navigate('/create-recipe')}>Create Recipe</li>
                                    <li onClick={() => navigate('/chart')}>Chart</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
