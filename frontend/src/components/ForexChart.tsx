import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography, Grid, Button, TextField } from '@mui/material';
import { fetchForexData } from '../services/api';

interface ForexData {
  dates: string[];
  rates: number[];
}

const ForexChart: React.FC<{symbol: string;}> = ({ symbol }) => {
  const [data, setData] = useState<ForexData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>(new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const fetchData = async (start: string, end: string) => {
    try {
      const [fromCurrency, toCurrency] = symbol.split('/');
      const forexData = await fetchForexData(fromCurrency, toCurrency, start, end);
      
      setData({
        dates: Object.keys(forexData),
        rates: Object.values(forexData).map((d: any) => parseFloat(d['Close']))
      });
    } catch (error) {
      console.error("Error fetching forex data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(startDate, endDate);
  }, [symbol, startDate, endDate]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (!data) {
    return <Typography variant="h6">No data available</Typography>;
  }

  const { dates, rates } = data;

  const handlePeriodChange = (months: number) => {
    const newStartDate = new Date();
    newStartDate.setMonth(newStartDate.getMonth() - months);
    setStartDate(newStartDate.toISOString().split('T')[0]);
    setEndDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      {/* <Typography variant="h6" component="h2" gutterBottom>
        Forex Rates
      </Typography> */}
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" className="mr-4" onClick={() => fetchData(startDate, endDate)}>
            Update
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handlePeriodChange(1)}>
            1 Month
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handlePeriodChange(6)}>
            6 Months
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handlePeriodChange(12)}>
            1 Year
          </Button>
        </Grid>
      </Grid>
      <Plot
        useResizeHandler
        style={{ width: '100%', height: '500px' }}
        data={[
          {
            x: dates,
            y: rates,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
            name: 'Forex Rates',
          },
        ]}
        layout={{ title: 'Forex Rates Over Time' }}
      />
    </Box>
  );
};

export default ForexChart;
