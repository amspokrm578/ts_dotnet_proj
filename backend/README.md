# Stock Portfolio Backend API

A .NET 8.0 ASP.NET Core Web API backend for managing stock quotes and portfolios.

## Features

- **Stock Quote API**: Proxy endpoint to fetch stock quotes from external API
- **Portfolio Management**: CRUD operations for managing user portfolios
- **SQLite Database**: Lightweight database for portfolio persistence
- **CORS Support**: Configured for React frontend integration
- **Swagger/OpenAPI**: API documentation available at `/swagger`

## Prerequisites

- .NET 8.0 SDK or later
- An API key for the stock quote service (e.g., Twelve Data API)

## Configuration

1. Update `appsettings.json` or `appsettings.Development.json` with your stock API configuration:

```json
{
  "StockApi": {
    "BaseUrl": "https://api.twelvedata.com",
    "ApiKey": "your-api-key-here"
  }
}
```

2. The database connection string is configured in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=portfolio.db"
  }
}
```

## Running the Application

1. Restore dependencies:
```bash
dotnet restore
```

2. Run the application:
```bash
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

## API Endpoints

### Stock Quotes

#### GET `/api/quote`
Get stock quote information.

**Query Parameters:**
- `symbol` (required): Stock symbol (e.g., "AAPL")
- `apikey` (optional): API key (can also be configured in appsettings)

**Example:**
```
GET /api/quote?symbol=AAPL&apikey=your-api-key
```

**Response:**
```json
{
  "symbol": "AAPL",
  "name": "Apple Inc",
  "exchange": "NASDAQ",
  "open": "150.00",
  "high": "152.00",
  "low": "149.50",
  "close": "151.50",
  ...
}
```

### Portfolio Management

#### GET `/api/portfolio`
Get all portfolio symbols.

**Response:**
```json
["AAPL", "MSFT", "GOOGL"]
```

#### POST `/api/portfolio`
Add a symbol to the portfolio.

**Query Parameters:**
- `symbol` (required): Stock symbol to add

**Example:**
```
POST /api/portfolio?symbol=AAPL
```

**Response:**
```json
{
  "symbol": "AAPL"
}
```

#### DELETE `/api/portfolio/{symbol}`
Remove a symbol from the portfolio.

**Example:**
```
DELETE /api/portfolio/AAPL
```

**Response:**
204 No Content

## Project Structure

```
backend/
├── Data/
│   └── ApplicationDbContext.cs    # Entity Framework DbContext
├── Models/
│   ├── Portfolio.cs               # Portfolio entity model
│   └── StockQuote.cs              # Stock quote DTO
├── Services/
│   ├── IStockService.cs           # Stock service interface
│   ├── StockService.cs            # Stock API integration
│   ├── IPortfolioService.cs       # Portfolio service interface
│   └── PortfolioService.cs        # Portfolio CRUD operations
├── Program.cs                      # Application entry point and configuration
└── appsettings.json                # Configuration file
```

## Database

The application uses SQLite for portfolio storage. The database file (`portfolio.db`) will be created automatically on first run.

To create a migration (if needed in the future):
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Development

### Building
```bash
dotnet build
```

### Testing
The API can be tested using:
- Swagger UI at `/swagger`
- Postman or any HTTP client
- The frontend React application

## Notes

- The stock API endpoint acts as a proxy to the external API
- Portfolio symbols are stored in uppercase
- Duplicate portfolio symbols are prevented
- CORS is configured to allow requests from `http://localhost:3000` and `http://localhost:5173`

