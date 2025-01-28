using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FitprojectAPI.Models;

public partial class FitprojectCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }
    [JsonIgnore]
    public virtual ICollection<FitprojectIngredient> ?FitprojectIngredients { get; set; } = new List<FitprojectIngredient>();
}
