using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        [HttpPost]
        public IActionResult ForgotPassword(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email is required.");
            }

            try
            {
                using (var context = new FitprojectContext())
                {
                    var existingUser = context.FitprojectUsers.FirstOrDefault(u => u.Email == email);
                    if (existingUser == null)
                    {
                        return BadRequest("Email address not found!");
                    }

                    var existingEmail = context.FitprojectPasswordresets.FirstOrDefault(u => u.Email == email);
                    if (existingEmail != null)
                    {
                        return BadRequest("We have already sent an email to this email address!");
                    }

                    // Token generálása
                    string token = GenerateToken();
                    DateTime expiryTime = DateTime.Now.AddHours(1); // 1 óra lejárati idő

                    // Token mentése az adatbázisba
                    var passwordReset = new FitprojectPasswordreset
                    {
                        Email = email,
                        Token = token,
                        ExpiryTime = expiryTime
                    };
                    context.FitprojectPasswordresets.Add(passwordReset);
                    context.SaveChanges();
                    
                    // Küldjünk egy emailt a tokennel
                    string resetLink = $"http://localhost:3000/ForgotPassword/{token}";
                    Program.SendEmail(email, "Password Reset", $"Click the link below to reset your password:\n{resetLink}");

                    return Ok("Password reset email sent successfully.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error occurred: {ex.Message}");
            }
        }

        private string GenerateToken()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] tokenData = new byte[32];
                rng.GetBytes(tokenData);
                return Convert.ToBase64String(tokenData).Replace("+", "").Replace("/", "").Replace("=", "");
            }
        }

    }
}
