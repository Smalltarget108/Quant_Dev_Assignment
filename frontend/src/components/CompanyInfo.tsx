import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { fetchProfile } from '../services/api';

interface ProfileProps {
  symbol: string;
}

const Profile: React.FC<ProfileProps> = ({ symbol }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await fetchProfile(symbol);
        setProfile(profileData);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!profile) {
    return <Typography variant="h6">No profile data available</Typography>;
  }

  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h6" component="h2" gutterBottom>Company Profile</Typography>
      <TableContainer >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Sector</strong></TableCell>
              <TableCell>{profile["Sector"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Industry</strong></TableCell>
              <TableCell>{profile["Industry"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Full Time Employees</strong></TableCell>
              <TableCell>{profile["Full Time Employees"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Summary</strong></TableCell>
              <TableCell>{profile["Long Business Summary"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>City</strong></TableCell>
              <TableCell>{profile["City"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>State</strong></TableCell>
              <TableCell>{profile["State"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Country</strong></TableCell>
              <TableCell>{profile["Country"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Website</strong></TableCell>
              <TableCell>
                <a href={profile["Website"]} target="_blank" rel="noopener noreferrer">
                  {profile["Website"]}
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Profile;
