using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FitprojectAPI.Models;

public partial class FitprojectRecipeIngredient
{
    public int RecipeId { get; set; }

    public int IngredientId { get; set; }

    public decimal Amount { get; set; }
    [JsonIgnore]

    public virtual FitprojectIngredient ?Ingredient { get; set; } = null!;
    [JsonIgnore]

    public virtual FitprojectRecipe ?Recipe { get; set; } = null!;
}
