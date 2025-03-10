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
        public IActionResult AddOrUpdateBmi([FromBody] BmiDto bmiDto)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    if (bmiDto == null)
                    {
                        return StatusCode(406, "No data received.");
                    }

                    var existingBmi = context.FitprojectBmis.FirstOrDefault(b => b.UserId == bmiDto.UserId);

                    if (existingBmi != null)
                    {
                        // Ha már létezik egy rekord, frissítjük
                        existingBmi.Date = DateTime.Now;
                        existingBmi.Height = bmiDto.Height;
                        existingBmi.Weight = bmiDto.Weight;
                        existingBmi.BmiValue = bmiDto.BmiValue;
                    }
                    else
                    {
                        // Ha nincs, létrehozunk egy újat
                        FitprojectBmi newBmi = new FitprojectBmi()
                        {
                            UserId = bmiDto.UserId,
                            Date = DateTime.Now,
                            Height = bmiDto.Height,
                            Weight = bmiDto.Weight,
                            BmiValue = bmiDto.BmiValue
                        };
                        context.FitprojectBmis.Add(newBmi);
                    }

                    context.SaveChanges();
                    return Ok("Sikeres mentés vagy frissítés.");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }




    }
}