import requests

FMP_API_KEY = "Q4ANQ2jzTZrA6Ijhut9btIKKWyV2Wl1X"


def fetch_company_info(symbol: str):
    url = f"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={FMP_API_KEY}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception(f"Error fetching company info: {response.text}")

    data = response.json()
    if not data:
        raise Exception("No data found for the specified symbol.")

    return data[0]


def fetch_company_financials(symbol: str):
    url = f"https://financialmodelingprep.com/api/v3/key-metrics/{symbol}?period=year&apikey={FMP_API_KEY}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception(f"Error fetching company financials: {response.text}")

    data = response.json()
    if not data:
        raise Exception("No data found for the specified symbol.")

    return data
