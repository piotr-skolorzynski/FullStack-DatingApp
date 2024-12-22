using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(DataContext context) : ControllerBase
    {

        [HttpGet]
        public ActionResult<IEnumerable<AppUser>> GetUsers() //api/users
        {
            var users = context.Users.ToList();

            return users;
        }

        [HttpGet("{id:int}")]
        public ActionResult<AppUser> GetUser(int id) //api/users/2
        {
            var user = context.Users.Find(id);

            if (user == null) return NotFound();

            return user;
        }
    }
}
