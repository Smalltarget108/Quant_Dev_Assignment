# FinDA

FinDA is a comprehensive financial data analysis platform.

## Installation

### Backend

1. **Create a conda environment**:
    ```bash
    conda create --name finda_env python=3.11
    conda activate finda_env
    ```

2. **Install dependencies**:
    ```bash
    cd  backend
    pip install -r requirements.txt
    ```
2. **Set up a Postgre SQL database and export the environment variable**: 
    ```sql
    CREATE DATABASE quantdb;
    ```
    ```bash
    python create_tables.py
    ```
    ```plaintext
    export DATABASE_URL=postgresql://username:password@localhost/quantdb
    ```

3. **Run the backend server**:
    ```bash
    uvicorn app.main:app --reload
    ```

### Frontend

1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the frontend development server**:
    ```bash
    npm start
    ```




## Features

1. **Search**: Search for stock and forex data using the search bar.
2. **Charts**: Visualize stock data with line charts, candlestick charts, and indicators such as moving averages and RSI.
3. **Statistics**: View summary statistics for selected stock data.
4. **News Feed**: Latest news related to the selected stock.
5. **Company Info**: Get detailed information about the company.
6. **Financials**: Analyze key financial metrics of the company.
7. **Register**: Create a new account.
8. **Login**: Access your account and get an authentication token.

