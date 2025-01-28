using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FitprojectAPI.Models;

public partial class FitprojectBmi
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int Height { get; set; }

    public decimal Weight { get; set; }

    public decimal BmiValue { get; set; }

    public DateTime Date { get; set; }

    [JsonIgnore]
    public virtual FitprojectUser ?User { get; set; } = null!;
}
