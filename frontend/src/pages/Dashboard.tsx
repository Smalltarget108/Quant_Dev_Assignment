import React, { useState } from 'react';
import { Container, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Search from '../components/Search';
import Charts from '../components/Charts';
import ForexChart from '../components/ForexChart';

import Statistics from '../components/Statistics';
import NewsFeed from '../components/NewsFeed';
import Profile from '../components/Profile';
import Financials from '../components/Financials';

const Dashboard: React.FC = () => {
  const [isForex, setIsForex] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');

  const handleSearch = (symbol: string) => {
    setSymbol(symbol);
    setIsForex(symbol.includes('/'));
    setSelectedComponent(symbol.includes('/') ? 'ForexChart' : 'Charts');
  };

  const renderComponent = () => {
    if (isForex) {
      return <ForexChart symbol={symbol} />;
    }
    switch (selectedComponent) {
      case 'Charts':
        return <Charts symbol={symbol} />;
      case 'Statistics':
        return <Statistics symbol={symbol} />;
      case 'NewsFeed':
        return <NewsFeed symbol={symbol} />;
      case 'Profile':
        return <Profile symbol={symbol} />;
      case 'Financials':
        return <Financials symbol={symbol} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex' }}>
      {!isForex && symbol && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 240,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              marginTop: '64px',
            },
          }}
        >
          <Box>
            <List>
              <ListItem component="button" onClick={() => setSelectedComponent('Charts')}>
                <ListItemText primary="Charts"/>
              </ListItem>
              <ListItem component="button" onClick={() => setSelectedComponent('Statistics')}>
                <ListItemText primary="Statistics" />
              </ListItem>
              <ListItem component="button" onClick={() => setSelectedComponent('NewsFeed')}>
                <ListItemText primary="News" />
              </ListItem>
              <ListItem component="button" onClick={() => setSelectedComponent('Profile')}>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem component="button" onClick={() => setSelectedComponent('Financials')}>
                <ListItemText primary="Financials" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: 0,
        }}
      >
        <Search onSearch={handleSearch} />
        {renderComponent()}
      </Box>
    </Container>
  );
};

export default Dashboard;
