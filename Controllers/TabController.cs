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
    public class TabController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<object>> Get([FromQuery] int musicaId, [FromServices] MaiaContext context)
        {
            if (musicaId == 0)
            {
                try
                {
                    return await context.Tabs
                        .OrderByDescending(t => t.QuantAcessos)
                        .Take(10)
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
                    return await context.Tabs
                        .Where(t => t.MusicaId == musicaId)
                        .Select(t => new
                        {
                            t.Titulo,
                            t.Id,
                            t.Instrumento,
                            t.Musica
                        })
                        .ToListAsync();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }

        [HttpGet]
        [Authorize]
        [Route("id/{id}")]
        public async Task<ActionResult<Tab>> GetById([FromRoute] int id, [FromServices] MaiaContext context)
        {
            try
            {
                var tab = await context.Tabs
                    .Where(t => t.Id == id)
                    .Include(t => t.Usuario)
                    .Include(t => t.Musica)
                    .ThenInclude(m => m.Album)
                    .Include(t => t.Musica)
                    .ThenInclude(m => m.ArtistaMusicas)
                    .ThenInclude(am => am.Artista)
                    .FirstOrDefaultAsync();
                tab.QuantAcessos += 1;

                await context.SaveChangesAsync();

                return tab;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("popular")]
        [Authorize]
        public async Task<ActionResult<object>> GetByPopularity([FromServices] MaiaContext context)
        {
            try
            {
                return await context.Tabs
                    .Select(t => new
                    {
                        t.Titulo,
                        t.Id,
                        t.Instrumento,
                        t.Musica,
                        t.QuantAcessos
                    })
                    .OrderByDescending(t => t.QuantAcessos)
                    .ToListAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Tab>> Post([FromBody] TabDTO dto, [FromServices] MaiaContext context)
        {
            try
            {
                var tab = dto.ToEntity();
                context.Tabs.Add(tab);

                if (await context.SaveChangesAsync() > 0)
                {
                    return Created($"tabs/id/{tab.Id}", tab);
                }

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