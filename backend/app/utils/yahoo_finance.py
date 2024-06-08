import yfinance as yf
import pandas as pd


def fetch_stock_data(symbol: str, start_date: str, end_date: str):
    stock = yf.Ticker(symbol)
    hist = stock.history(start=start_date, end=end_date)

    stock_data = {
        "Open": hist["Open"].to_dict(),
        "High": hist["High"].to_dict(),
        "Low": hist["Low"].to_dict(),
        "Close": hist["Close"].to_dict(),
        "Volume": hist["Volume"].to_dict(),
    }

    return stock_data


def calculate_moving_average(data: pd.Series, window_size: int):
    return data.rolling(window=window_size).mean().to_dict()


def calculate_rsi(data: pd.Series, period: int = 14):
    delta = data.diff()  # calculates the difference between consecutive data points
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))  # make index ranging from 0 to 100
    return rsi.to_dict()


def fetch_stock_indicators(symbol: str, start_date: str, end_date: str):
    stock = yf.Ticker(symbol)
    extended_start_date = pd.to_datetime(start_date) - pd.DateOffset(months=12)

    hist = stock.history(start=extended_start_date, end=end_date)

    if hist.empty:
        return {"error": "No data found"}

    close_prices = hist["Close"]
    indicators = {
        "50_day_moving_average": calculate_moving_average(close_prices, 50),
        "200_day_moving_average": calculate_moving_average(close_prices, 200),
        "RSI": calculate_rsi(close_prices, 14),
    }

    # only include original start_date to end_date
    # tz_localize(None) remove timezone to comparable in pandas timestamp
    filtered_indicators = {
        "50_day_moving_average": {
            date: value
            for date, value in indicators["50_day_moving_average"].items()
            if pd.to_datetime(date).tz_localize(None) >= pd.to_datetime(start_date)
        },
        "200_day_moving_average": {
            date: value
            for date, value in indicators["200_day_moving_average"].items()
            if pd.to_datetime(date).tz_localize(None) >= pd.to_datetime(start_date)
        },
        "RSI": {
            date: value
            for date, value in indicators["RSI"].items()
            if pd.to_datetime(date).tz_localize(None) >= pd.to_datetime(start_date)
        },
    }

    return filtered_indicators


def fetch_stock_statistics(symbol: str):
    stock = yf.Ticker(symbol)
    statistics = {
        "Market Cap": stock.info.get("marketCap"),
        "Enterprise Value": stock.info.get("enterpriseValue"),
        "Trailing PE": stock.info.get("trailingPE"),
        "Forward PE": stock.info.get("forwardPE"),
        "PEG Ratio": stock.info.get("pegRatio"),
        "Price to Sales (TTM)": stock.info.get("priceToSalesTrailing12Months"),
        "Price to Book": stock.info.get("priceToBook"),
        "Enterprise to Revenue": stock.info.get("enterpriseToRevenue"),
        "Enterprise to EBITDA": stock.info.get("enterpriseToEbitda"),
        "Profit Margins": stock.info.get("profitMargins"),
        "EBITDA Margins": stock.info.get("ebitdaMargins"),
        "Operating Margins": stock.info.get("operatingMargins"),
        "Gross Margins": stock.info.get("grossMargins"),
        "Total Debt to Equity": stock.info.get("totalDebtToEquity"),
        "Current Ratio": stock.info.get("currentRatio"),
        "Quick Ratio": stock.info.get("quickRatio"),
        "Return on Assets": stock.info.get("returnOnAssets"),
        "Return on Equity": stock.info.get("returnOnEquity"),
    }
    return statistics


def fetch_profile(symbol: str):
    stock = yf.Ticker(symbol)
    profile = {
        "Sector": stock.info.get("sector"),
        "Industry": stock.info.get("industry"),
        "Full Time Employees": stock.info.get("fullTimeEmployees"),
        "Long Business Summary": stock.info.get("longBusinessSummary"),
        "City": stock.info.get("city"),
        "State": stock.info.get("state"),
        "Country": stock.info.get("country"),
        "Website": stock.info.get("website"),
        "Logo URL": stock.info.get("logo_url"),
    }
    return profile


def fetch_financials(symbol: str):
    stock = yf.Ticker(symbol)
    financials = stock.financials.T.to_dict()
    return financials


def fetch_news(symbol: str):
    stock = yf.Ticker(symbol)
    news = stock.news
    formatted_news = []
    for article in news:
        formatted_news.append(
            {
                "Title": article.get("title"),
                "Link": article.get("link"),
                "Published Date": article.get("providerPublishTime"),
                "Source": article.get("publisher"),
                "Summary": article.get("summary"),
            }
        )
    return formatted_news


def fetch_forex_data(
    from_currency: str, to_currency: str, start_date: str, end_date: str
):
    symbol = f"{from_currency}{to_currency}=X"
    data = yf.download(symbol, start=start_date, end=end_date)

    if data.empty:
        return {"error": "No data found for the specified date range."}

    filtered_data = data.to_dict("index")
    return filtered_data
