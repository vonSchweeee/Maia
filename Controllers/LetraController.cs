using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Maia.Controllers
{
    [Route("[controller]s")]
    public class LetraController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Letra>>> GetByMusicaId([FromServices] MaiaContext context ,[FromQuery] int musicaId)
        {
            try
            {
                return await context.Letras.Where(l => l.MusicaId == musicaId)
                    .ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}