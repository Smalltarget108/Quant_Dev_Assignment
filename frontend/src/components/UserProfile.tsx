import React from 'react';
import { Box, Typography } from '@mui/material';

interface UserProfileProps {
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="body1" gutterBottom>
        User ID: {user.id}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Username: {user.username}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {user.email}
      </Typography>
    </Box>
  );
};


export default UserProfile;