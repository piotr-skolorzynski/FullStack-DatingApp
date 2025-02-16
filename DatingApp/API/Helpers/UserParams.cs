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

    //umożliwienie filtrownia po płci
    public string? Gender { get; set; }
    //Current user - żeby móc go nie uwzględniać w wynikach wyszukiwania
    public string? CurrentUsername { get; set; }

}
