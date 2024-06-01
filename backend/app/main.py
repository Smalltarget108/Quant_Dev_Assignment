from fastapi import FastAPI
from app.routers import stock, forex, company, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock.router)
app.include_router(forex.router)
app.include_router(company.router)
app.include_router(auth.router)


@app.get("/")
def read_root():
    return {"message": "Financial Data API"}