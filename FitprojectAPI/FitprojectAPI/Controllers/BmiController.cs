using FitprojectAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BmiController : ControllerBase
    {
        [HttpPost]
        public IActionResult AddBmi(FitprojectBmi bmi)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    if (bmi == null)
                    {
                        return StatusCode(406, "Nem érkezett adat.");
                    }
                    FitprojectBmi newBmi = new FitprojectBmi()
                    {
                        UserId = bmi.UserId,
                        Date = DateTime.Now,
                        Height = bmi.Height,
                        Weight = bmi.Weight,
                        BmiValue = bmi.BmiValue

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
