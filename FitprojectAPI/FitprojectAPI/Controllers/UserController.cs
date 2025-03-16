using FitprojectAPI.DTOs;
using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUserDTO(string token)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    if (Program.LoggedInUsers.ContainsKey(token))
                    {
                        var userEmail = Program.LoggedInUsers[token]; // Token alapján kapjuk az e-mailt

                        var user = context.FitprojectUsers
                                    .Include(k => k.FitprojectBmis)
                                    .Include(k => k.FitprojectCalories)
                                    .Where(k => k.Email == userEmail.Email) // Csak a bejelentkezett usert kérjük le
                                    .Select(k => new
                                    {
                                        k.Id,
                                        k.Name,
                                        k.Email,
                                        Weight = k.FitprojectBmis.Select(b => b.Weight).ToList(),
                                        Height = k.FitprojectBmis.Select(b => b.Height).ToList(),
                                        BmiValue = k.FitprojectBmis.Select(b => b.BmiValue).ToList(),
                                        CalorieCount = k.FitprojectCalories.Select(c => c.CalorieCount).ToList()
                                    })
                                    .FirstOrDefault();

                        if (user != null)
                        {
                            return Ok(user);
                        }
                        else
                        {
                            return NotFound("User data not found.");
                        }
                    }
                    else
                    {
                        return Unauthorized("Invalid token.");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpDelete("DeleteUserData")]
        public IActionResult DeleteUserData(int userId)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var user = context.FitprojectUsers
                        .Include(k => k.FitprojectBmis)
                        .Include(k => k.FitprojectCalories)
                        .FirstOrDefault(u => u.Id == userId);

                    if (user == null)
                    {
                        return NotFound("Felhasználó nem található.");
                    }

                    
                    if (user.FitprojectBmis != null && user.FitprojectBmis.Any())
                    {
                        context.FitprojectBmis.RemoveRange(user.FitprojectBmis);
                    }

                 
                    if (user.FitprojectCalories != null && user.FitprojectCalories.Any())
                    {
                        context.FitprojectCalories.RemoveRange(user.FitprojectCalories);
                    }

                    
                    context.SaveChanges();

                    return Ok("Felhasználói adatok sikeresen törölve.");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}