import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { fetchStockStatistics } from '../services/api';

interface StatisticsProps {
  symbol: string;
  startDate: string;
  endDate: string;
}

const Statistics: React.FC<StatisticsProps> = ({ symbol, startDate, endDate }) => {
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchStockStatistics(symbol, startDate, endDate);
        setStatistics({
          mean: stats.mean.toFixed(2),
          median: stats.median.toFixed(2),
          std: stats.std.toFixed(2),
          min: stats.min.toFixed(2),
          max: stats.max.toFixed(2),
        });
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError("Failed to fetch statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, startDate, endDate]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!statistics) {
    return <Typography variant="h6">No statistics data available</Typography>;
  }

  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h6" component="h2" gutterBottom>
        Summary Statistics
      </Typography>
      <TableContainer sx={{ width: '80%' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Mean</strong></TableCell>
              <TableCell><strong>Median</strong></TableCell>
              <TableCell><strong>Standard Deviation</strong></TableCell>
              <TableCell><strong>Min</strong></TableCell>
              <TableCell><strong>Max</strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{statistics.mean}</TableCell>
              <TableCell>{statistics.median}</TableCell>
              <TableCell>{statistics.std}</TableCell>
              <TableCell>{statistics.min}</TableCell>
              <TableCell>{statistics.max}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Statistics;
