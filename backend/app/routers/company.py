from fastapi import APIRouter, HTTPException
from app.utils.fmp import fetch_company_info, fetch_company_financials

router = APIRouter()


@router.get("/company/{symbol}/info")
def get_company_info(symbol: str):
    try:
        info = fetch_company_info(symbol)
        financials = fetch_company_financials(symbol)

        if not info or not financials:
            raise HTTPException(
                status_code=404,
                detail="No company information or financials found for the specified symbol.",
            )

        combined_data = {"company_info": info, "financials": financials}

        return combined_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
