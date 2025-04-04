using System;
using System.Collections.Generic;

namespace FitprojectAPI.Models;

public partial class FitprojectUser
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Hash { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public int Aktiv { get; set; }

    public int Jogosultsag { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime? RegisztracioDatum { get; set; }


}
