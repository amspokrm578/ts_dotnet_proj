namespace backend.Services;

public interface IChatService
{
    Task<string> GetChatResponseAsync(string userMessage);
}

