using System.Text.RegularExpressions;

namespace backend.Services;

public class ChatService : IChatService
{
    private readonly ILogger<ChatService> _logger;

    public ChatService(ILogger<ChatService> logger)
    {
        _logger = logger;
    }

    public Task<string> GetChatResponseAsync(string userMessage)
    {
        if (string.IsNullOrWhiteSpace(userMessage))
        {
            return Task.FromResult("I'm here to help! Please ask me a question about stocks, portfolios, or this application.");
        }

        var message = userMessage.ToLower().Trim();

        // Stock-related queries
        if (ContainsKeywords(message, new[] { "stock", "quote", "price", "ticker", "symbol", "share" }))
        {
            return Task.FromResult("To search for stock quotes, use the search bar at the top of the page. Enter a ticker symbol (like AAPL, MSFT, or GOOGL) and click Search. I can help you find information about specific stocks!");
        }

        // Portfolio queries
        if (ContainsKeywords(message, new[] { "portfolio", "watchlist", "add", "remove", "delete" }))
        {
            return Task.FromResult("You can manage your portfolio by clicking the 'Add' button on any stock card to add it to your portfolio, or use the 'X' button to remove stocks. Your portfolio is saved automatically and persists across sessions.");
        }

        // Help/How-to queries
        if (ContainsKeywords(message, new[] { "help", "how", "what", "how to", "guide", "tutorial" }))
        {
            return Task.FromResult("I can help you with:\n\n" +
                   "• Searching for stocks: Use the search bar to find stock quotes by ticker symbol\n" +
                   "• Managing your portfolio: Add stocks by clicking 'Add' on any stock card\n" +
                   "• Viewing stock data: Search results show current prices, changes, and market information\n\n" +
                   "What would you like to know more about?");
        }

        // Greeting queries
        if (ContainsKeywords(message, new[] { "hello", "hi", "hey", "greetings" }))
        {
            return Task.FromResult("Hello! I'm your AI assistant for this stock portfolio application. I can help you with stock searches, portfolio management, and answer questions about how to use the app. What can I help you with today?");
        }

        // Features queries
        if (ContainsKeywords(message, new[] { "feature", "can do", "capabilities", "function" }))
        {
            return Task.FromResult("This application allows you to:\n\n" +
                   "✓ Search for real-time stock quotes\n" +
                   "✓ Build and manage your personal portfolio\n" +
                   "✓ View detailed stock information including prices, changes, and market data\n" +
                   "✓ Get autocomplete suggestions while typing ticker symbols\n\n" +
                   "Try searching for a stock to get started!");
        }

        // API/Technical queries
        if (ContainsKeywords(message, new[] { "api", "backend", "technology", "built", "tech stack" }))
        {
            return Task.FromResult("This application is built with:\n\n" +
                   "Frontend: React with TypeScript and Tailwind CSS\n" +
                   "Backend: .NET 8.0 with ASP.NET Core Web API\n" +
                   "Database: SQLite for portfolio storage\n" +
                   "Stock Data: Integrated with external stock API services\n\n" +
                   "The architecture follows modern best practices with a clean separation between frontend and backend.");
        }

        // Default response with suggestions
        return Task.FromResult("I understand you're asking about: \"" + userMessage + "\"\n\n" +
               "I can help you with:\n" +
               "• Searching for stocks and viewing quotes\n" +
               "• Managing your portfolio\n" +
               "• Understanding how to use the application\n" +
               "• General questions about stocks and investing\n\n" +
               "Could you rephrase your question, or would you like help with something specific?");
    }

    private bool ContainsKeywords(string message, string[] keywords)
    {
        return keywords.Any(keyword => message.Contains(keyword));
    }
}

