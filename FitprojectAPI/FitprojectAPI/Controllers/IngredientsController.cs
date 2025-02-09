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
                    var ingredients = context.FitprojectIngredients.Where(x => x.CategoryId == categoryId).Select(x => new {x.Name, x.CalPer100g, x.Description, x.ImageUrl }).ToList();
                    return Ok(ingredients);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
       /* [HttpGet("category/{receptId}")]
 public IActionResult GetByRecipeId(int receptId)
 {
     using (var context = new FitprojectContext())
     {
         try
         {
             var ingredients = context.FitprojectRecipeIngredients.Include(x=>x.Recipe).Include(x=>x.Ingredient).Where(x=>x.RecipeId == receptId).Select(x=>x.Ingredient.Name).ToList();
             return Ok(ingredients);
         }
         catch (Exception ex)
         {
             return BadRequest(ex.Message);
         }
     }
 }*/
    }
}
