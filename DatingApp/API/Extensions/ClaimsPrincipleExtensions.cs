using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        //wyrzuć wyjątek jeśli nie znajdzie użytkownika w tokenie co raczej się nie wydarzy ale załatwia
        //sprawę że FindFirstValue zwraca null jeśli nie znajdzie wartości  
        var username = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Cannot get username from token");

        return username;
    }
}
