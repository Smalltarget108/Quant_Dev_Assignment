import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Link, CircularProgress } from '@mui/material';
import { fetchNews } from '../services/api';

interface NewsFeedProps {
  symbol: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ symbol }) => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await fetchNews(symbol);
        setNews(newsData);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news");
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

  if (!news || news.length === 0) {
    return <Typography variant="h6">No news available.</Typography>;
  }

  return (
    <Box className="p-4 bg-white shadow-md rounded-md">
      <List>
        {news.map((article, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={<Link href={article.Link} target="_blank">{article.Title}</Link>}
              secondary={
                <>
                  <Typography component="span">{new Date(article["Published Date"] * 1000).toLocaleDateString()}</Typography>
                  <Typography component="span"> - {article.Source}</Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NewsFeed;
