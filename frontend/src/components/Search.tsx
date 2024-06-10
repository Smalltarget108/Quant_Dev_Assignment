import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';

interface SearchProps {
  onSearch: (symbol: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [symbol, setSymbol] = useState<string>('');

  const handleSearch = () => {
    onSearch(symbol || 'AAPL');
    if (symbol === '') {
      setSymbol('AAPL');
    }
  };

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  };

  return (
    <Box className="p-4 mt-16 mb-3 bg-white shadow-md rounded-md">
      <Typography variant="h6" component="h2" className="text-center">
        Search Finance Data
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            label="Stock/Forex Symbol"
            fullWidth
            margin="normal"
            value={symbol}
            onChange={handleSymbolChange}
            placeholder="AAPL"
            InputProps={{
              style: { color: symbol ? 'inherit' : 'grey' }
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            style={{ height: '56px', marginTop: '6px' }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
