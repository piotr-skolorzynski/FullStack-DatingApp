using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    //Navigation properties - will create Required one-to-many relationship
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}
