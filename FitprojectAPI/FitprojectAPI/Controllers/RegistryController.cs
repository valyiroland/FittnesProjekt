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
                    if (context.FitprojectUsers.FirstOrDefault(u => u.Name == user.Name) != null)
                    {
                        return BadRequest("A felhasználónév foglalt!");
                    }
                    if (context.FitprojectUsers.FirstOrDefault(u => u.Email == user.Email) != null)
                    {
                        return BadRequest("Az email cím már foglalt!");
                    }
                    user.Aktiv = 0;
                    user.Jogosultsag = 0;
                    user.Hash = Program.CreateSHA256(user.Hash);
                    await context.FitprojectUsers.AddAsync(user);
                    await context.SaveChangesAsync();
                    Program.SendEmail(user.Email, "Regisztráció", $"A következő linkre kattintva véglegesítse a regisztrációját: \nhttp://localhost:5071/Registry?name={user.Name}&email={user.Email}");
                    return Ok("Sikeres regisztráció! Az aktiváláshoz ellenőrizze az email fiókját!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet]

        public async Task<IActionResult> Activate(string name, string email)
        {
            using (var context = new FitprojectContext())
            {

                try
                {
                    var user = context.FitprojectUsers.FirstOrDefault(u => u.Name == name && u.Email == email);
                    if (user == null)
                    {
                        return BadRequest("Sikertelen aktiválás.");



                    }
                    user.Aktiv = 1;
                    context.FitprojectUsers.Update(user);
                    await context.SaveChangesAsync();
                    return Ok("siker aktiválás!");

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message+name+email);
                }

            }

        }
    }
}
