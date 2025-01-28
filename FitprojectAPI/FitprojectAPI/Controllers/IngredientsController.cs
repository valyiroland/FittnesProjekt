using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitprojectAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        [HttpGet("category/{categoryId}")]
        public IActionResult GetByCategory(int categoryId)
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var ingredients = context.FitprojectIngredients.Where(x => x.CategoryId == categoryId).Select(x => new {x.Name, x.CalPer100g, x.Description }).ToList();
                    return Ok(ingredients);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
