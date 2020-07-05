using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Utils;
using Maia.Utils.DTO;
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
        public async Task<ActionResult<List<Letra>>> GetByMusicaId([FromServices] MaiaContext context, [FromQuery] int musicaId)
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

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Letra>> Post([FromBody] LetraDTO model, [FromServices] MaiaContext context)
        {
            try
            {
                var letra = model.ToEntity();
                
                context.Letras.Add(letra);
                if (await context.SaveChangesAsync() > 0)
                    return Created($"letras/id/{letra.Id}", letra);

                return BadRequest();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}