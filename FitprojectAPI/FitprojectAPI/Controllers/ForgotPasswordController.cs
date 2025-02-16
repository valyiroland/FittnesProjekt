using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        [HttpPut]

        public IActionResult ForgotPassword(FitprojectUser user)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var existingUser = context.FitprojectUsers.FirstOrDefault(u => u.Email == user.Email);
                    if (existingUser == null)
                    {
                        return BadRequest("Email address not found!");
                    }
                    Program.SendEmail(user.Email, "Password Reset", $"Click the following link to reset your password.: \nhttp://localhost:5071/ForgotPassword?name={user.Name}&email={user.Email}");
                    // Új SALT generálása
                    string newSalt = Program.GenerateSalt();
                    existingUser.Salt = newSalt;

                    // Új HASH generálása a SALT hozzáadásával
                    string saltedPassword = user.Hash + newSalt;
                    existingUser.Hash = Program.CreateSHA256(saltedPassword);

                    context.SaveChanges();
                    return Ok("Password successfully changed!");
                    

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

    }
}
