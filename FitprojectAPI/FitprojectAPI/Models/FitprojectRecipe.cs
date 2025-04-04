using System;
using System.Collections.Generic;

namespace FitprojectAPI.Models;

public partial class FitprojectRecipe
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }
    [JsonIgnore]
    public virtual ICollection<FitprojectRecipeIngredient> FitprojectRecipeIngredients { get; set; } = new List<FitprojectRecipeIngredient>();
}
