import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { fetchStatistics } from '../services/api';

interface StatisticsProps {
  symbol: string;
}

const Statistics: React.FC<StatisticsProps> = ({ symbol }) => {
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchStatistics(symbol);
        setStatistics(stats);
        // console.log("Statistics.tsx: stats:", stats);
      } catch (err) {
        // console.error("Error fetching statistics:", err);
        setError("Failed to fetch statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!statistics) {
    return <Typography variant="h6">No statistics data available</Typography>;
  }

  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h6" gutterBottom>
        Statistics
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Metric</strong></TableCell>
              <TableCell><strong>Value</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(statistics).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{String(value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Statistics;
