from pydantic import BaseModel
from typing import List, Optional


class ForexData(BaseModel):
    date: str
    rate: float


class CompanyInfo(BaseModel):
    name: str
    description: str
    sector: str
    industry: str
    market_cap: float
    pe_ratio: float


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class StockData(BaseModel):
    date: str
    open: float
    high: float
    low: float
    close: float
    volume: int


class StockStatistics(BaseModel):
    mean: float
    median: float
    std_dev: float


class NewsArticle(BaseModel):
    title: str
    url: str
    published_at: str
