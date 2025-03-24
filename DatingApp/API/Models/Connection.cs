namespace API.Models;

public class Connection
{
    public required string ConnectionId { get; set; } //jeśli coś ma id w nazwie to EF nam to usatwi
    public required string Username { get; set; }
}
