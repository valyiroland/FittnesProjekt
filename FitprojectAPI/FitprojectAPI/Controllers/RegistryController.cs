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
                        return BadRequest("Username is already taken!");
                    }
                    if (context.FitprojectUsers.FirstOrDefault(u => u.Email == user.Email) != null)
                    {
                        return BadRequest("Email address is already taken!");
                    }
                    user.Aktiv = 0;
                    user.Jogosultsag = 0;
                    user.Hash = Program.CreateSHA256(user.Hash);
                    await context.FitprojectUsers.AddAsync(user);
                    await context.SaveChangesAsync();
                    Program.SendEmail(user.Email, "Registration", $"Click the following link to finalize your registration.: \nhttp://localhost:5071/Registry?name={user.Name}&email={user.Email}");
                    return Ok("Successful registration! Check your email for activation!");
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
                        return BadRequest("Activation failed!");



                    }
                    user.Aktiv = 1;
                    context.FitprojectUsers.Update(user);
                    await context.SaveChangesAsync();
                    return Ok("Successful activation!");

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message+name+email);
                }

            }

        }
    }
}
