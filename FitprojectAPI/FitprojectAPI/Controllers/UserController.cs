using FitprojectAPI.DTOs;
using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("GetAllDTO")]
        public IActionResult GetAllDTO()
        {
          
                using (var context = new FitprojectContext())
            {
                try
                {
                    var result = context.FitprojectUsers.Include(k => k.FitprojectBmis).Include(k => k.FitprojectCalories).Select(k => new
                    {
                        k.Id,
                        k.Name,
                        k.Email,
                        Weight = k.FitprojectBmis.Select(k => k.Weight).ToList(),
                        Height = k.FitprojectBmis.Select(k => k.Height).ToList(),
                        BmiValue= k.FitprojectBmis.Select(k => k.BmiValue).ToList(),
                        CalorieCount= k.FitprojectCalories.Select(k=>k.CalorieCount).ToList()
                    }).ToList();
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            }
          
        
    }
}
