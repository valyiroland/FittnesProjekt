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

        [HttpPut("NewPassword")]
        public async Task<IActionResult> NewPassword(string token, string newPassword)
        {
            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(newPassword))
            {
                return BadRequest(new { message = "Token and new password are required." });
            }

            try
            {
                using (var context = new FitprojectContext())
                {
                    // Ellenőrizzük, hogy a token érvényes
                    var resetRequest = await context.FitprojectPasswordresets
                        .FirstOrDefaultAsync(r => r.Token == token && r.ExpiryTime > DateTime.Now);

                    if (resetRequest == null)
                    {
                        return BadRequest(new { message = "Invalid or expired token." });
                    }

                    // A felhasználó keresése email cím alapján, amihez a token tartozik
                    var existingUser = await context.FitprojectUsers.FirstOrDefaultAsync(u => u.Email == resetRequest.Email);
                    if (existingUser == null)
                    {
                        return BadRequest(new { message = "User not found." });
                    }

                    // Ellenőrizzük, hogy az új jelszó megfelelő-e
                    if (newPassword.Length < 6)
                    {
                        return BadRequest(new { message = "Password must be at least 6 characters long." });
                    }

                    // Új Salt generálása
                    var newSalt = Program.GenerateSalt();  // A GenerateSalt metódus használata

                    // Az új jelszó hash-elése az új Salt-tal
                    var newHash = Program.CreateSHA256(Program.CreateSHA256(newPassword + newSalt));  // A CreateSHA256 metódus használata

                    // Frissítjük az adatbázist a felhasználó új Hash-jével és Salt-jával
                    existingUser.Hash = newHash;
                    existingUser.Salt = newSalt;

                    context.FitprojectUsers.Update(existingUser);
                    await context.SaveChangesAsync();

                    // A reset kérelem törlése, ha sikeresen frissítettük a jelszót
                    context.FitprojectPasswordresets.Remove(resetRequest);
                    await context.SaveChangesAsync();

                    return Ok(new { message = "Password changed successfully!" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred: {ex.Message}" });
            }
        }




    }
}
