namespace API.Helpers;

public class UserParams
{
    //zazwyczaj ustawiamy ręcznie maksymalną liczbę
    private const int MaxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 10; //domyślny rozmiar strony

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

    public string? Gender { get; set; }
    public string? CurrentUsername { get; set; }
    //kolejne filtry
    public int MinAge { get; set; } = 18;
    public int MaxAge { get; set; } = 100;
}
