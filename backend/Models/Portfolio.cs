namespace backend.Models;

public class Portfolio
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

