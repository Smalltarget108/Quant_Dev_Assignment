from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, schemas
from app.dependencies import get_db
from app.routers.auth import get_current_user
from typing import List

router = APIRouter(prefix="/stock", tags=["stock"])


@router.get("/{symbol}/data", response_model=schemas.StockData)
def get_stock_data(
    symbol: str,
    start_date: str,
    end_date: str,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    return crud.get_stock_data(db, symbol, start_date, end_date)


@router.get("/{symbol}/statistics", response_model=schemas.StockStatistics)
def get_summary_statistics(
    symbol: str, start_date: str, end_date: str, db: Session = Depends(get_db)
):
    return crud.get_summary_statistics(db, symbol, start_date, end_date)


@router.get("/{symbol}/news", response_model=List[schemas.NewsArticle])
def get_news(symbol: str):
    return crud.get_news(symbol)
