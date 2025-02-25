using FitprojectAPI.Models;
using Microsoft.AspNetCore.Mvc;
using FitprojectAPI.DTOs;
namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BmiController : ControllerBase
    {
        [HttpPost]
        public IActionResult AddBmi([FromBody] BmiDto bmiDto)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    if (bmiDto == null)
                    {
                        return StatusCode(406, "Nem érkezett adat.");
                    }

                    FitprojectBmi newBmi = new FitprojectBmi()
                    {
                        UserId = bmiDto.UserId,
                        Date = DateTime.Now,
                        Height = bmiDto.Height,
                        Weight = bmiDto.Weight,
                        BmiValue = bmiDto.BmiValue
                    };

                    context.FitprojectBmis.Add(newBmi);
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