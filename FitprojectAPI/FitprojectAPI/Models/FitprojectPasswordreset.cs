using System;
using System.Collections.Generic;

namespace FitprojectAPI.Models;

public partial class FitprojectPasswordreset
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Token { get; set; } = null!;

    public DateTime ExpiryTime { get; set; }

    public virtual FitprojectUser EmailNavigation { get; set; } = null!;
}
