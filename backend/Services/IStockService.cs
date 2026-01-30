using backend.Models;

namespace backend.Services;

public interface IStockService
{
    Task<StockQuote?> GetStockQuoteAsync(string symbol, string apiKey);
}

