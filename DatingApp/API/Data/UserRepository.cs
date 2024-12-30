using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context) : IUserRepository
{
    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await context.Users.FindAsync(id); //ta metoda może zwócić null ale to ok bo zrobiliśmy AppUser? jako zwracany model
    }

    public async Task<AppUser?> GetUserByUsernameAsync(string username)
    {
        return await context.Users.SingleOrDefaultAsync(x => x.UserName == username);
        //jeżeli jest więcej niż jedna wartość to rzuci wyjątkiem ale w naszej implementacji nie dopuszczamy do duplikacji nazw użytkowników
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0; //po zapisaniu zmian ta metoda zwraca liczbę zmian, więc zero oznacza że nic nie zapisaliśmy
    }

    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified; //EF samodzielnie wie że zostało zmienione ale chcemy mu to powiedzieć otwarcie
    }
}
