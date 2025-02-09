using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                    var recipes = context.FitprojectRecipes
                        .Include(r => r.FitprojectRecipeIngredients) 
                        .ThenInclude(ri => ri.Ingredient) 
                        .Select(r => new
                        {
                            r.Id,
                            r.Name,
                            r.Description,
                            Ingredients = r.FitprojectRecipeIngredients.Select(ri => ri.Ingredient.Name).ToList()
                        })
                        .ToList();

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
