import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography, Grid, Button, TextField } from '@mui/material';
import { fetchStockData, fetchStockIndicators } from '../services/api';

interface StockData {
  dates: string[];
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}

interface IndicatorsData {
  movingAverage50: { [date: string]: number };
  movingAverage200: { [date: string]: number };
  rsi: { [date: string]: number };
}


const Charts: React.FC<{symbol: string}> = ({ symbol }) => {
  const [data, setData] = useState<StockData | null>(null);
  const [indicators, setIndicators] = useState<IndicatorsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>(new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const fetchData = async (start: string, end: string) => {
    try {
      const stockData = await fetchStockData(symbol, start, end);
      // console.log("Charts.tsx: stockData:", stockData);
      const indicatorsData = await fetchStockIndicators(symbol, start, end);
      // console.log("Charts.tsx: indicatorsData:", indicatorsData);

      if (!stockData || !Object.keys(stockData.Open).length) {
        throw new Error('Invalid stock data');
      }

      if (!indicatorsData || indicatorsData.error) {
        throw new Error('Invalid indicators data');
      }

      setData({
        dates: Object.keys(stockData.Open),
        open: Object.values(stockData.Open),
        high: Object.values(stockData.High),
        low: Object.values(stockData.Low),
        close: Object.values(stockData.Close),
        volume: Object.values(stockData.Volume),
      });
      setIndicators({
        movingAverage50: indicatorsData["50_day_moving_average"],
        movingAverage200: indicatorsData["200_day_moving_average"],
        rsi: indicatorsData["RSI"],
      });
    } catch (error) {
      console.error("Error fetching stock data or indicators:", error);
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

  const { dates, open, high, low, close, volume } = data;
  const { movingAverage50, movingAverage200, rsi } = indicators || {};

  const handlePeriodChange = (months: number) => {
    const newStartDate = new Date();
    newStartDate.setMonth(newStartDate.getMonth() - months);
    setStartDate(newStartDate.toISOString().split('T')[0]);
    setEndDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <Grid container spacing={2} alignItems="center">
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
          <Button variant="contained" className="mr-4" onClick={() => handlePeriodChange(1)}>
            1 Month
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" className="mr-4" onClick={() => handlePeriodChange(6)}>
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
        style={{ width: '100%', height: '700px' }}
        data={[
          {
            x: dates,
            y: close,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
            name: 'Line Chart',
            yaxis: 'y1',
          },
          {
            x: dates,
            open: open,
            high: high,
            low: low,
            close: close,
            type: 'candlestick',
            name: 'Candlestick Chart',
            yaxis: 'y1',
          },
          ...(movingAverage50 ? [
            {
              x: dates,
              y: Object.values(movingAverage50),
              type: 'scatter' as const,
              mode: 'lines' as const,
              name: '50-day Moving Average',
              yaxis: 'y1',
            },
          ] : []),
          ...(movingAverage200 ? [
            {
              x: dates,
              y: Object.values(movingAverage200),
              type: 'scatter' as const,
              mode: 'lines' as const,
              name: '200-day Moving Average',
              yaxis: 'y1',
            },
          ] : []),
          ...(rsi ? [
            {
              x: dates,
              y: Object.values(rsi),
              type: 'scatter' as const,
              mode: 'lines' as const,
              name: 'RSI',
              yaxis: 'y3',
            },
          ] : []),
          {
            x: dates,
            y: volume,
            type: 'bar',
            name: 'Trading Volume',
            yaxis: 'y2',
          },
        ]}
        layout={{
          title: 'Data Visualization',
          grid: { rows: 3, columns: 1, pattern: 'independent' },
          yaxis: { title: 'Price', domain: [0.4, 1] },
          yaxis2: { title: 'Volume', domain: [0.2, 0.36] },
          yaxis3: { title: 'RSI', domain: [0, 0.2] },
          shapes: [
            {
              type: 'line',
              xref: 'x',
              yref: 'y3',
              x0: dates[0],
              x1: dates[dates.length - 1],
              y0: 70,
              y1: 70,
              line: {
                color: 'red',
                width: 2,
                dash: 'dot',
              },
            },
            {
              type: 'line',
              xref: 'x',
              yref: 'y3',
              x0: dates[0],
              x1: dates[dates.length - 1],
              y0: 30,
              y1: 30,
              line: {
                color: 'green',
                width: 2,
                dash: 'dot',
              },
            },
          ],
        }}
      />
    </Box>
  );
};

export default Charts;
