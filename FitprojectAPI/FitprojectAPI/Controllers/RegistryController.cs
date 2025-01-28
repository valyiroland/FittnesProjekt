using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitprojectAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Registry(FitprojectUser user)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    if(context.FitprojectUsers.FirstOrDefault(u => u.Name == user.Name) != null)
                    {
                        return BadRequest("A felhasználónév foglalt!");
                    }
                    if(context.FitprojectUsers.FirstOrDefault(u => u.Email == user.Email) != null)
                    {
                        return BadRequest("Az email cím már foglalt!");
                    }
                    user.Aktiv = 0;
                    user.Jogosultsag = 0;
                    user.Hash = Program.CreateSHA256(user.Hash);
                    await context.FitprojectUsers.AddAsync(user);
                    await context.SaveChangesAsync();
                    Program.SendEmail(user.Email, "Regisztráció", $"A következő linkre kattintva véglegesítse a regisztrációját: \nhttp://localhost:5000/api/Registry?felhasznaloNev={user.Name}&email={user.Email}");
                    return Ok("Sikeres regisztráció! Az aktiváláshoz ellenőrizze az email fiókját!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
