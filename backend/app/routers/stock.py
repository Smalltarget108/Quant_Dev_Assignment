from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.utils.yahoo_finance import (
    fetch_stock_data,
    fetch_stock_indicators,
    fetch_stock_statistics,
    fetch_news,
)

from app import models
from .auth import get_current_user
from app.dependencies import get_db

router = APIRouter()


@router.get("/stock/{symbol}/data")
def get_stock_data(
    symbol: str,
    start_date: str,
    end_date: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Fetch historical data for the given stock symbol between the specified dates.

    - **symbol**: Stock symbol (e.g., AAPL)
    - **start_date**: Start date in YYYY-MM-DD format
    - **end_date**: End date in YYYY-MM-DD format
    """
    try:
        data = fetch_stock_data(symbol, start_date, end_date)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stock/{symbol}/indicators")
def get_stock_indicators(
    symbol: str,
    start_date: str,
    end_date: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Fetch technical indicators (moving averages and RSI) for the given stock symbol between the specified dates.

    - **symbol**: Stock symbol (e.g., AAPL)
    - **start_date**: Start date in YYYY-MM-DD format
    - **end_date**: End date in YYYY-MM-DD format
    """
    try:
        indicators = fetch_stock_indicators(symbol, start_date, end_date)
        return indicators
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stock/{symbol}/statistics")
def get_stock_statistics(
    symbol: str,
    start_date: str,
    end_date: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
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
def get_stock_news(
    symbol: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Fetch latest news for the given stock symbol.

    - **symbol**: Stock symbol (e.g., AAPL)
    """
    try:
        news = fetch_news(symbol)
        return news
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
