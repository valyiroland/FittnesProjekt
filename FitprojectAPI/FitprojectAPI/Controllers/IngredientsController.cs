using FitprojectAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitprojectAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        [HttpGet("Vegetables")]

        public IActionResult GetV()
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var vegetables = context.FitprojectIngredients.Where(x=>x.CategoryId==1).Select(x => x.Name).ToList();
                    return Ok(vegetables);
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpGet("Fruit")]

        public IActionResult GetF()
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var fruit = context.FitprojectIngredients.Where(x => x.CategoryId == 2).Select(x => x.Name).ToList();
                    return Ok(fruit);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpGet("Meats&Fishes")]

        public IActionResult GetMF()
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var meats = context.FitprojectIngredients.Where(x => x.CategoryId == 3).Select(x => x.Name).ToList();
                    return Ok(meats);
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpGet("Pasta")]

        public IActionResult GetP()
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var pasta = context.FitprojectIngredients.Where(x => x.CategoryId == 4).Select(x => x.Name).ToList();
                    return Ok(pasta);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpGet("Nuts&Legumes")]

        public IActionResult GetNL()
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var nuts = context.FitprojectIngredients.Where(x => x.CategoryId == 5).Select(x => x.Name).ToList();
                    return Ok(nuts);
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpGet("Dairy")]

        public IActionResult GetD()
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var dairy = context.FitprojectIngredients.Where(x => x.CategoryId == 6).Select(x => x.Name).ToList();
                    return Ok(dairy);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        [HttpGet("Others")]

        public IActionResult GetO()
        {
            using (var context = new FitprojectContext())
            {
                try
                {
                    var others = context.FitprojectIngredients.Where(x => x.CategoryId == 7).Select(x => x.Name).ToList();
                    return Ok(others);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
