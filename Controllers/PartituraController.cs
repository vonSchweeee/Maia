using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Models;
using Maia.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Maia.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class PartituraController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        [Route("popular")]
        public async Task<ActionResult<List<Partitura>>> GetByPopularity([FromQuery] long musicaId,
            [FromServices] MaiaContext context)
        {
            if (musicaId == 0)
            {
                try
                {
                    return await context.Partituras
                        .Include(p => p.Musica)
                        .OrderBy(p => p.QuantAcessos)
                        .ToListAsync();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
            else
            {
                try
                {
                    return await context.Partituras
                        .Where(p => p.MusicaId == musicaId)
                        .Include(p => p.Musica)
                        .ToListAsync();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Partitura>> Post([FromBody] PartituraDTO dto, [FromServices] MaiaContext context)
        {
            try
            {
                var partitura = dto.ToEntity();
                context.Add(partitura);

                if (await context.SaveChangesAsync() > 0)
                {
                    return Created($"partituras/id/${partitura.Id}", partitura);
                }

                return BadRequest();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Authorize]
        [Route("id/{id}")]
        public async Task<ActionResult<Partitura>> GetById([FromRoute] int id, [FromServices] MaiaContext context)
        {
            try
            {
                return await context.Partituras
                    .Where(m => m.Id == id)
                    .Include(p => p.Musica)
                    .Include(p => p.Usuario)
                    .FirstOrDefaultAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}