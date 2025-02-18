using System;
using System.Collections.Generic;

namespace FitprojectAPI.Models;

public partial class FitprojectRecipeIngredient
{
    public int RecipeId { get; set; }

    public int IngredientId { get; set; }

    public decimal Amount { get; set; }

    public virtual FitprojectIngredient Ingredient { get; set; } = null!;

    public virtual FitprojectRecipe Recipe { get; set; } = null!;
}
