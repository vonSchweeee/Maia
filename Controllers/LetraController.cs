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
    public class LetraController : ControllerBase
    {
        [HttpGet]
        [Route("popular")]
        [Authorize]
        public async Task<ActionResult<List<Musica>>> GetByPopularity([FromServices] MaiaContext context)
        {
            try
            {
                return await context.Letras
                    .Include(l => l.Musica)
                    .ThenInclude(m => m.Album)
                    .Include(l => l.Musica)
                    .ThenInclude(m => m.ArtistaMusicas)
                    .ThenInclude(am => am.Artista)
                    .OrderByDescending(l => l.QuantAcessos)
                    .Select(l => l.Musica)
                    .ToListAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
        
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Letra>>> GetByMusicaId([FromServices] MaiaContext context, [FromQuery] int musicaId)
        {

            try
            {
                var letras = await context.Letras
                    .Where(l => l.MusicaId == musicaId)
                    .Include(l => l.Musica)
                    .ThenInclude(l => l.ArtistaMusicas)
                    .ThenInclude(l => l.Artista)
                    .ToListAsync();

                foreach (var letra in letras)
                {
                    letra.QuantAcessos += 1;
                }
                await context.SaveChangesAsync();

                return letras;
                
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Authorize]
        [Route("check")]
        public async Task<ActionResult<object>> CheckIfAdded([FromQuery] int musicaId, [FromServices] MaiaContext context)
        {
            try
            {
                var queryMusica = context.Musicas
                    .Where(m => m.Id == musicaId)
                    .Include(m => m.Album)
                    .Include(m => m.ArtistaMusicas)
                    .ThenInclude(am => am.Artista);
                
                
                var letras = await context.Letras
                        .Where(l => l.MusicaId == musicaId)
                        .ToListAsync();

                if (letras != null)
                {
                    List<string> idiomas = new List<string>();
                    
                    foreach (var letra in letras)
                    {
                        idiomas.Add(letra.Idioma);
                    }

                    if (idiomas.Count == 2)
                    {
                        return new { completo = true, idiomas };
                    }

                    
                    var musica = await queryMusica.FirstOrDefaultAsync();

                    return new { completo = false, idiomas, musica };
                }

                var musicaRf = await queryMusica.FirstOrDefaultAsync();
                return new {completo = false, musica = musicaRf};
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