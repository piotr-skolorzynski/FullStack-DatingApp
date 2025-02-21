using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next();

        if (context.HttpContext.User.Identity?.IsAuthenticated != true) return; //sprawdzamy czy użytkownik jest uwierzytelniony

        var username = resultContext.HttpContext.User.GetUsername(); //pobieramy username tak jak w kontrolerze

        var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>(); //pobieramy serwis
        var user = await repo.GetUserByUsernameAsync(username); // pobieramy użytkownika
        if (user == null) return;
        //teraz możemy zaktuwalizować dane w bazie na temat ostatniej aktywności użytkownika
        user.LastActive = DateTime.UtcNow;
        //zapisz w bazce
        await repo.SaveAllAsync();
    }
}
