import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserProfile from './UserProfile';
import Popover from '@mui/material/Popover';
import { fetchUserProfile } from '../services/api';
import { FaSignInAlt, FaSignOutAlt, FaRegUser, FaUser } from 'react-icons/fa';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (!user) {
      try {
        const userProfile = await fetchUserProfile();
        setUser(userProfile);
      } catch (error: any) {
        console.error('Error fetching user profile:', error);
        if (error.response && error.response.status === 401) {
          logout(); // Log out if the token is invalid
          <Navigate to="/login" />
        }
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onLogout = () => {
    logout();
  };

  return (
    <header className='fixed top-0 left-0 right-0 h-16 bg-white z-50 flex justify-between items-center px-16 py-4 border-b border-gray-300'>
      <div className='font-semibold'>
        <Link to='/dashboard' className='text-black no-underline'>FinDA</Link>
      </div>
      <ul className='flex items-center space-x-5'>
        {isAuthenticated ? (
          <li className="flex">
            <button className='flex items-center text-black no-underline hover:text-gray-500 mr-4' onClick={handleUser}>
              <FaUser /> User
            </button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              {user && <UserProfile user={user} />}
            </Popover>
            <button className='flex items-center text-black no-underline hover:text-gray-500' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login' className='flex items-center text-black no-underline hover:text-gray-500'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register' className='flex items-center text-black no-underline hover:text-gray-500'>
                <FaRegUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
