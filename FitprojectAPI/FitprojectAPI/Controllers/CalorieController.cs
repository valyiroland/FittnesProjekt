using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalorieController : ControllerBase
    {
        [HttpPost("AddCal")]

        public IActionResult AddCal(FitprojectCalory calorie)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    if (calorie == null)
                    {
                        return StatusCode(406, "Nem érkezett adat.");
                    }
                    FitprojectCalory newcalorie = new FitprojectCalory()
                    {
                        UserId=calorie.UserId,
                        Date=DateTime.Now,
                        CalorieCount = calorie.CalorieCount
                    };
                    context.FitprojectCalories.Add(newcalorie);
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
