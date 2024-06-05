import yfinance as yf


def fetch_stock_data(symbol: str, start_date: str, end_date: str):
    stock = yf.Ticker(symbol)
    hist = stock.history(start=start_date, end=end_date)
    return hist


def fetch_forex_data(
    from_currency: str, to_currency: str, start_date: str, end_date: str
):
    symbol = f"{from_currency}{to_currency}=X"
    data = yf.download(symbol, start=start_date, end=end_date)

    if data.empty:
        print("No data found for the specified date range.")
        print("Requested start date:", start_date)
        print("Requested end date:", end_date)
        return {}

    filtered_data = data.to_dict("index")
    return filtered_data


def fetch_stock_statistics(symbol: str, start_date: str, end_date: str):
    data = fetch_stock_data(symbol, start_date, end_date)
    return {
        "mean": data["Close"].mean(),
        "median": data["Close"].median(),
        "std_dev": data["Close"].std(),
    }
