import requests

API_KEY = "SU26C7FMIS5I176B"


# request limit: 25 per day
def fetch_forex_data(
    from_currency: str, to_currency: str, start_date: str, end_date: str
):
    url = f"https://www.alphavantage.co/query?function=FX_DAILY&from_symbol={from_currency}&to_symbol={to_currency}&apikey={API_KEY}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception(f"Error fetching forex data: {response.text}")

    data = response.json()
    print("API Response:", data)

    if "Time Series FX (Daily)" not in data:
        raise Exception(f"Error in response: {data}")

    time_series = data.get("Time Series FX (Daily)", {})
    # print("Available data dates:", list(time_series.keys()))

    filtered_data = {
        date: values
        for date, values in time_series.items()
        if start_date <= date <= end_date
    }

    if not filtered_data:
        print("No data found for the specified date range.")
        print("Requested start date:", start_date)
        print("Requested end date:", end_date)

    return filtered_data
