using FitprojectAPI.DTOs;
using FitprojectAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalorieController : ControllerBase
    {
        [HttpPost]
        public IActionResult AddCalorie([FromBody] CalorieDTO calorieDto)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    if (calorieDto == null)
                    {
                        return StatusCode(406, "Nem érkezett adat.");
                    }

                    
                    FitprojectCalory newCalorieRecord = new FitprojectCalory()
                    {
                        UserId = calorieDto.UserId,
                        Date = calorieDto.Date,
                        CalorieCount = calorieDto.CalorieCount
                    };

                   
                    context.FitprojectCalories.Add(newCalorieRecord);
                    context.SaveChanges();
                    return Ok("Sikeres rögzítés.");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
