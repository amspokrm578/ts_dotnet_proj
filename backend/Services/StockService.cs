using System.Text.Json;
using backend.Models;

namespace backend.Services;

public class StockService : IStockService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<StockService> _logger;
    private readonly IConfiguration _configuration;

    public StockService(HttpClient httpClient, ILogger<StockService> logger, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _logger = logger;
        _configuration = configuration;
    }

    public async Task<StockQuote?> GetStockQuoteAsync(string symbol, string apiKey)
    {
        try
        {
            var apiUrl = _configuration["StockApi:BaseUrl"] ?? "https://api.twelvedata.com";
            var url = $"{apiUrl}/quote?symbol={symbol}&apikey={apiKey}";

            _logger.LogInformation("Fetching stock quote for symbol: {Symbol}", symbol);

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning("Failed to fetch stock quote. Status: {StatusCode}", response.StatusCode);
                return null;
            }

            var jsonString = await response.Content.ReadAsStringAsync();
            
            // Handle both single object and array responses
            StockQuote? quote = null;
            if (jsonString.TrimStart().StartsWith('['))
            {
                var quotes = JsonSerializer.Deserialize<List<StockQuote>>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                quote = quotes?.FirstOrDefault();
            }
            else
            {
                quote = JsonSerializer.Deserialize<StockQuote>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }

            return quote;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching stock quote for symbol: {Symbol}", symbol);
            return null;
        }
    }
}

