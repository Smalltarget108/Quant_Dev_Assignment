from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import crud, schemas
from app.dependencies import get_db

router = APIRouter(prefix="/forex", tags=["forex"])


@router.get(
    "/{from_currency}/{to_currency}/data", response_model=List[schemas.ForexData]
)
def get_forex_data(
    from_currency: str,
    to_currency: str,
    start_date: str,
    end_date: str,
    db: Session = Depends(get_db),
):
    data = crud.get_forex_data(db, from_currency, to_currency, start_date, end_date)
    if not data:
        raise HTTPException(status_code=404, detail="Forex data not found")
    return data
