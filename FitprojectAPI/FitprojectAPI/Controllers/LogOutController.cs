﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitprojectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogOutController : ControllerBase
    {
        [HttpPost]
        public IActionResult Logout(string uId)
        {
            if (Program.LoggedInUsers.ContainsKey(uId))
            {
                lock (Program.LoggedInUsers)
                {
                    Program.LoggedInUsers.Remove(uId);
                }
                return Ok("Sikeres kijelentkezés!");
            }
            return NotFound("Nem található felhasználó");

        }
    }
}
