from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.dependencies import get_db

router = APIRouter(prefix="/company", tags=["company"])


@router.get("/{symbol}/info", response_model=schemas.CompanyInfo)
def get_company_info(symbol: str, db: Session = Depends(get_db)):
    company_info = crud.get_company_info(db, symbol)
    if not company_info:
        raise HTTPException(status_code=404, detail="Company information not found")
    return company_info
