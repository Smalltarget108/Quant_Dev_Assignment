import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import { fetchFinancials } from '../services/api';

interface FinancialsProps {
  symbol: string;
}

const Financials: React.FC<FinancialsProps> = ({ symbol }) => {
  const [financials, setFinancials] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const financialsData = await fetchFinancials(symbol);
        setFinancials(financialsData);
      } catch (err) {
        console.error("Error fetching financials:", err);
        setError("Failed to fetch financials");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  const formatDate = (dateString: string) => {
    return dateString.split('T')[0];
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!financials) {
    return <Typography variant="h6">No financial data available</Typography>;
  }

  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h6" component="h2" gutterBottom>Financials</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Metric</strong></TableCell>
            {Object.keys(financials[Object.keys(financials)[0]]).map(date => (
              <TableCell key={date}>{formatDate(date)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(financials).map(metric => (
            <TableRow key={metric}>
              <TableCell>{metric}</TableCell>
              {Object.values(financials[metric]).map((value: any, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Financials;
