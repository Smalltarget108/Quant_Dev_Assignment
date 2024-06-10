from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

# from app.utils.alpha_vantage import fetch_forex_data
from app.utils.yahoo_finance import fetch_forex_data
from app import models
from .auth import get_current_user
from app.dependencies import get_db

router = APIRouter()


@router.get("/forex/{from_currency}/{to_currency}/data")
def get_forex_data(
    from_currency: str,
    to_currency: str,
    start_date: str,
    end_date: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Fetch historical forex data for the given currency pair between the specified dates.

    - **from_currency**: Source currency (e.g., USD)
    - **to_currency**: Target currency (e.g., EUR)
    - **start_date**: Start date in YYYY-MM-DD format
    - **end_date**: End date in YYYY-MM-DD format
    """
    try:
        data = fetch_forex_data(from_currency, to_currency, start_date, end_date)
        if not data:
            raise HTTPException(
                status_code=404, detail="No data found for the specified date range."
            )
        return data
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
