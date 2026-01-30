using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Services;

public class PortfolioService : IPortfolioService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<PortfolioService> _logger;

    public PortfolioService(ApplicationDbContext context, ILogger<PortfolioService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<Portfolio>> GetAllPortfoliosAsync()
    {
        return await _context.Portfolios
            .OrderBy(p => p.Symbol)
            .ToListAsync();
    }

    public async Task<Portfolio?> GetPortfolioBySymbolAsync(string symbol)
    {
        return await _context.Portfolios
            .FirstOrDefaultAsync(p => p.Symbol == symbol);
    }

    public async Task<Portfolio> AddPortfolioAsync(string symbol)
    {
        var portfolio = new Portfolio
        {
            Symbol = symbol.ToUpper(),
            CreatedAt = DateTime.UtcNow
        };

        _context.Portfolios.Add(portfolio);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Added portfolio symbol: {Symbol}", symbol);
        return portfolio;
    }

    public async Task<bool> DeletePortfolioAsync(string symbol)
    {
        var portfolio = await GetPortfolioBySymbolAsync(symbol);
        if (portfolio == null)
        {
            return false;
        }

        _context.Portfolios.Remove(portfolio);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Deleted portfolio symbol: {Symbol}", symbol);
        return true;
    }

    public async Task<bool> PortfolioExistsAsync(string symbol)
    {
        return await _context.Portfolios
            .AnyAsync(p => p.Symbol == symbol);
    }
}

