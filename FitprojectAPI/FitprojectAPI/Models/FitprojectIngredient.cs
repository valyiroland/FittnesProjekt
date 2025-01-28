﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FitprojectAPI.Models;

public partial class FitprojectIngredient
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal CalPer100g { get; set; }

    public int CategoryId { get; set; }

    public string? Description { get; set; }

    public virtual FitprojectCategory Category { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<FitprojectRecipeIngredient> ?FitprojectRecipeIngredients { get; set; } = new List<FitprojectRecipeIngredient>();
}
