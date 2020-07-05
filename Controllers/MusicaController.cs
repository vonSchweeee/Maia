using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Utils;
using Maia.Utils.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Maia.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class MusicaController
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Musica>>> Get([FromQuery] PageParameters pageParameters, [FromServices] MaiaContext context, [FromQuery] string nome)
        {
            if (nome == null)
            {
                int size;
                if (pageParameters != null)
                    size = pageParameters.Size;
                else
                    size = 16;
                
                int page = pageParameters.Page;
                try
                {
                    return await context.Musicas
                        .Skip((page - 1) * size)
                        .Take(size)
                        .ToListAsync();
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            else
            {
                return await context.Musicas
                    .FromSqlRaw($"SELECT * FROM maia.musicas WHERE Titulo LIKE '%{nome}%'")
                    .ToListAsync();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("id/{id}")]
        public async Task<ActionResult<object>> GetById(
            [FromRoute] int id, [FromServices] MaiaContext context, [FromQuery] bool detailed = false, [FromQuery] bool includeAlbum = false
        )
        {
            try
            {
                if (detailed)
                {
                    return await context.Musicas.Where(m => m.Id == id)
                        .Include(m => m.Album)
                        .Include(m => m.ArtistaMusicas)
                        .ThenInclude(am => am.Artista)
                        .FirstOrDefaultAsync();
                }

                if (includeAlbum)
                {
                    return await context.Musicas.Where(m => m.Id == id)
                        .Include(m => m.Album)
                        .FirstOrDefaultAsync();
                }

                return await context.Musicas.Where(m => m.Id == id)
                    .FirstOrDefaultAsync();

            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}