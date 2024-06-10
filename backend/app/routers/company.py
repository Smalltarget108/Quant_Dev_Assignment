from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

# from app.utils.fmp import fetch_company_info, fetch_company_financials
from app.utils.yahoo_finance import (
    fetch_profile,
    fetch_financials,
)
from app import models
from .auth import get_current_user
from app.dependencies import get_db

router = APIRouter()


@router.get("/company/{symbol}/info")
def get_company_info(
    symbol: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Fetch profile information for the given stock symbol.

    - **symbol**: Stock symbol (e.g., AAPL)
    """
    try:
        profile = fetch_profile(symbol)
        return profile
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/company/{symbol}/financials")
def get_company_financials(
    symbol: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Fetch financial data for the given stock symbol.

    - **symbol**: Stock symbol (e.g., AAPL)
    """
    try:
        financials = fetch_financials(symbol)
        return financials
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
