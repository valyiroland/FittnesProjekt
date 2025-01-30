using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitprojectAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        [HttpGet("Recipes")]

        public IActionResult GetR()
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var recipes = context.FitprojectRecipes.Select(x => new { x.Name, x.Description}).ToList();
                    return Ok(recipes);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
