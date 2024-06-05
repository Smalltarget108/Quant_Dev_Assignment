from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.utils.yahoo_finance import fetch_stock_data, fetch_stock_statistics
import yfinance as yf

router = APIRouter()


@router.get("/stock/{symbol}/data")
def get_stock_data(symbol: str, start_date: str, end_date: str):
    """
    Fetch historical data for the given stock symbol between the specified dates.

    - **symbol**: Stock symbol (e.g., AAPL)
    - **start_date**: Start date in YYYY-MM-DD format
    - **end_date**: End date in YYYY-MM-DD format
    """
    try:
        data = fetch_stock_data(symbol, start_date, end_date)
        return data.to_dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stock/{symbol}/statistics")
def get_stock_statistics(symbol: str, start_date: str, end_date: str):
    """
    Fetch summary statistics for the given stock symbol between the specified dates.

    - **symbol**: Stock symbol (e.g., AAPL)
    - **start_date**: Start date in YYYY-MM-DD format
    - **end_date**: End date in YYYY-MM-DD format
    """
    try:
        stats = fetch_stock_statistics(symbol, start_date, end_date)
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stock/{symbol}/news")
def get_stock_news(symbol: str):
    """
    Fetch latest news for the given stock symbol.

    - **symbol**: Stock symbol (e.g., AAPL)
    """
    try:
        stock = yf.Ticker(symbol)
        news = stock.news
        return news
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
