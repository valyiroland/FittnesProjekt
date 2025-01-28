using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FitprojectAPI.Models;

public partial class FitprojectCalory
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateTime Date { get; set; }

    public int CalorieCount { get; set; }
    [JsonIgnore]
    public virtual FitprojectUser ?User { get; set; } = null!;
}
