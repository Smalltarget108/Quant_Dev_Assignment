from fastapi import APIRouter, HTTPException

# from app.utils.alpha_vantage import fetch_forex_data
from app.utils.yahoo_finance import fetch_forex_data

router = APIRouter()


@router.get("/forex/{from_currency}/{to_currency}/data")
def get_forex_data(
    from_currency: str, to_currency: str, start_date: str, end_date: str
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
