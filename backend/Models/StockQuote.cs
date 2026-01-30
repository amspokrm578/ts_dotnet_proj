using System.Text.Json.Serialization;

namespace backend.Models;

public class StockQuote
{
    [JsonPropertyName("symbol")]
    public string Symbol { get; set; } = string.Empty;
    
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
    
    [JsonPropertyName("exchange")]
    public string Exchange { get; set; } = string.Empty;
    
    [JsonPropertyName("mic_code")]
    public string MicCode { get; set; } = string.Empty;
    
    [JsonPropertyName("currency")]
    public string Currency { get; set; } = string.Empty;
    
    [JsonPropertyName("datetime")]
    public string DateTime { get; set; } = string.Empty;
    
    [JsonPropertyName("timestamp")]
    public long Timestamp { get; set; }
    
    [JsonPropertyName("last_quote_at")]
    public long LastQuoteAt { get; set; }
    
    [JsonPropertyName("open")]
    public string Open { get; set; } = string.Empty;
    
    [JsonPropertyName("high")]
    public string High { get; set; } = string.Empty;
    
    [JsonPropertyName("low")]
    public string Low { get; set; } = string.Empty;
    
    [JsonPropertyName("close")]
    public string Close { get; set; } = string.Empty;
    
    [JsonPropertyName("volume")]
    public string Volume { get; set; } = string.Empty;
    
    [JsonPropertyName("previous_close")]
    public string PreviousClose { get; set; } = string.Empty;
    
    [JsonPropertyName("change")]
    public string Change { get; set; } = string.Empty;
    
    [JsonPropertyName("percent_change")]
    public string PercentChange { get; set; } = string.Empty;
    
    [JsonPropertyName("average_volume")]
    public string AverageVolume { get; set; } = string.Empty;
    
    [JsonPropertyName("is_market_open")]
    public bool IsMarketOpen { get; set; }
    
    [JsonPropertyName("fifty_two_week")]
    public FiftyTwoWeekRange? FiftyTwoWeek { get; set; }
}

public class FiftyTwoWeekRange
{
    [JsonPropertyName("low")]
    public string Low { get; set; } = string.Empty;
    
    [JsonPropertyName("high")]
    public string High { get; set; } = string.Empty;
    
    [JsonPropertyName("low_change")]
    public string LowChange { get; set; } = string.Empty;
    
    [JsonPropertyName("high_change")]
    public string HighChange { get; set; } = string.Empty;
    
    [JsonPropertyName("low_change_percent")]
    public string LowChangePercent { get; set; } = string.Empty;
    
    [JsonPropertyName("high_change_percent")]
    public string HighChangePercent { get; set; } = string.Empty;
    
    [JsonPropertyName("range")]
    public string Range { get; set; } = string.Empty;
}

