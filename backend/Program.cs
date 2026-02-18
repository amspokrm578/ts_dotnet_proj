using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure Entity Framework Core with SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register services
builder.Services.AddHttpClient<IStockService, StockService>();
builder.Services.AddScoped<IPortfolioService, PortfolioService>();
builder.Services.AddScoped<IChatService, ChatService>();

var app = builder.Build();

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");

// Stock Quote Endpoint
app.MapGet("/api/quote", async (
    string symbol,
    string? apikey,
    IStockService stockService,
    IConfiguration configuration) =>
{
    if (string.IsNullOrWhiteSpace(symbol))
    {
        return Results.BadRequest(new { error = "Symbol parameter is required" });
    }

    var apiKey = apikey ?? configuration["StockApi:ApiKey"];
    if (string.IsNullOrWhiteSpace(apiKey))
    {
        return Results.BadRequest(new { error = "API key is required" });
    }

    var quote = await stockService.GetStockQuoteAsync(symbol, apiKey);
    
    if (quote == null)
    {
        return Results.NotFound(new { error = $"Stock quote not found for symbol: {symbol}" });
    }

    return Results.Ok(quote);
})
.WithName("GetStockQuote")
.WithOpenApi();

// Portfolio Endpoints
app.MapGet("/api/portfolio", async (IPortfolioService portfolioService) =>
{
    var portfolios = await portfolioService.GetAllPortfoliosAsync();
    return Results.Ok(portfolios.Select(p => p.Symbol));
})
.WithName("GetAllPortfolios")
.WithOpenApi();

app.MapPost("/api/portfolio", async (
    string symbol,
    IPortfolioService portfolioService) =>
{
    if (string.IsNullOrWhiteSpace(symbol))
    {
        return Results.BadRequest(new { error = "Symbol parameter is required" });
    }

    var normalizedSymbol = symbol.ToUpper();

    // Check if portfolio already exists
    if (await portfolioService.PortfolioExistsAsync(normalizedSymbol))
    {
        return Results.Conflict(new { error = $"Portfolio with symbol {normalizedSymbol} already exists" });
    }

    var portfolio = await portfolioService.AddPortfolioAsync(normalizedSymbol);
    return Results.Created($"/api/portfolio/{portfolio.Symbol}", new { symbol = portfolio.Symbol });
})
.WithName("AddPortfolio")
.WithOpenApi();

app.MapDelete("/api/portfolio/{symbol}", async (
    string symbol,
    IPortfolioService portfolioService) =>
    {
    if (string.IsNullOrWhiteSpace(symbol))
    {
        return Results.BadRequest(new { error = "Symbol parameter is required" });
    }

    var normalizedSymbol = symbol.ToUpper();
    var deleted = await portfolioService.DeletePortfolioAsync(normalizedSymbol);

    if (!deleted)
    {
        return Results.NotFound(new { error = $"Portfolio with symbol {normalizedSymbol} not found" });
    }

    return Results.NoContent();
})
.WithName("DeletePortfolio")
.WithOpenApi();

// Chat Endpoint
app.MapPost("/api/chat", async (
    HttpRequest request,
    IChatService chatService) =>
{
    try
    {
        var body = await new StreamReader(request.Body).ReadToEndAsync();
        var json = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(body);
        
        if (!json.TryGetProperty("message", out var messageElement))
        {
            return Results.BadRequest(new { error = "Message is required" });
        }

        var userMessage = messageElement.GetString();
        if (string.IsNullOrWhiteSpace(userMessage))
        {
            return Results.BadRequest(new { error = "Message cannot be empty" });
        }

        var response = await chatService.GetChatResponseAsync(userMessage);
        return Results.Ok(new { response });
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { error = "Invalid request format", details = ex.Message });
    }
})
.WithName("Chat")
.WithOpenApi();

app.Run();
