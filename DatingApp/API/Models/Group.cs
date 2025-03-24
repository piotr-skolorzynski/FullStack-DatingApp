using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Group
{
    [Key] //powoduje to że Entity Framework wymusi że Name ma być unikalne
    public required string Name { get; set; }
    public ICollection<Connection> Connections { get; set; } = [];
}
