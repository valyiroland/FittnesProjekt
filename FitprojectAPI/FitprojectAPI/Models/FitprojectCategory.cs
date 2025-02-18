using System;
using System.Collections.Generic;

namespace FitprojectAPI.Models;

public partial class FitprojectCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<FitprojectIngredient> FitprojectIngredients { get; set; } = new List<FitprojectIngredient>();
}
