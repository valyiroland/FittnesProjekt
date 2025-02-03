using FitprojectAPI.DTOs;
using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost("GetSalt/{Name}")]
        public async Task<IActionResult> GetSalt(string name)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    FitprojectUser response = await context.FitprojectUsers.FirstOrDefaultAsync(z => z.Name == name);
                    if (response == null)
                    {
                        return NotFound("Felhasználó nem található!");
                    }
                    return Ok(response.Salt);
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
        }



        [HttpPost]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            using (var conttext = new FitprojectContext())
            {
                try
                {
                    string hash = Program.CreateSHA256(loginDTO.TmpHash);
                    FitprojectUser response = await conttext.FitprojectUsers.FirstOrDefaultAsync(u => u.Name == loginDTO.LoginName && u.Hash == hash);
                    if (response != null && response.Aktiv == 1)
                    {

                        string token = Guid.NewGuid().ToString();
                        lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(token, response);

                        }
                        return Ok(new LoggedInUser()
                        {
                            Token = token,
                            Name = response.Name,
                            Email = response.Email,
                           

                        });

                    }
                    return NotFound("Felhasználó nem található vagy nem aktív!");
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);

                }
            }
        }
    }



}
