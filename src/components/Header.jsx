import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/components.css';

function Header({ user }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        auth.signOut();
        navigate('/login');
    };

    return (
        <div className="header">
            <div className="headerLogo">
                <h3>Kitchen app</h3>
            </div>
            <div className="headerAccount">
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
                                    <li onClick={() => alert('Change Theme')}>Change Theme</li>
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
