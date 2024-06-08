import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  
}); //local server address of the backend API

export const fetchUserProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const fetchStockData = async (symbol: string, startDate: string, endDate: string) => {
  const response = await api.get(`/stock/${symbol}/data`, { params: { start_date: startDate, end_date: endDate } });
  return response.data;
};

export const fetchStockIndicators = async (symbol: string, startDate: string, endDate: string) => {
  const response = await api.get(`/stock/${symbol}/indicators`, {
    params: { start_date: startDate, end_date: endDate },
  });
  return response.data;
};

export const fetchStatistics = async (symbol: string) => {
  const response = await api.get(`/stock/${symbol}/statistics`);
  return response.data;  
};

export const fetchNews = async (symbol: string) => {
  const response = await api.get(`/stock/${symbol}/news`);
  return response.data;  
};

export const fetchProfile = async (symbol: string) => {
  const response = await api.get(`/company/${symbol}/info`);
  return response.data;  
};

export const fetchFinancials = async (symbol: string) => {
  const response = await api.get(`/company/${symbol}/financials`);
  return response.data;
};

export const fetchForexData = async (fromCurrency: string, toCurrency: string, startDate: string, endDate: string) => {
  const response = await api.get(`/forex/${fromCurrency}/${toCurrency}/data`, { params: { start_date: startDate, end_date: endDate } });
  return response.data;
};
