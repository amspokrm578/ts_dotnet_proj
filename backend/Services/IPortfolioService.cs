using backend.Models;

namespace backend.Services;

public interface IPortfolioService
{
    Task<List<Portfolio>> GetAllPortfoliosAsync();
    Task<Portfolio?> GetPortfolioBySymbolAsync(string symbol);
    Task<Portfolio> AddPortfolioAsync(string symbol);
    Task<bool> DeletePortfolioAsync(string symbol);
    Task<bool> PortfolioExistsAsync(string symbol);
}

