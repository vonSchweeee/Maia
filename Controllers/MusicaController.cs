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
        public async Task<ActionResult<List<Musica>>> Get([FromQuery] PageParameters pageParameters, [FromServices] MaiaContext context)
        {
            int size = pageParameters.Size;
            int page = pageParameters.Page;
            try 
            {
                return await context.Musicas
                    .Skip((page - 1) * size)
                    .Take(size)
                    .ToListAsync();
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Authorize]
        [Route("id/{id}")]
        public async Task<ActionResult<object>> GetByIdWithInfo([FromRoute] int id, [FromServices] MaiaContext context)
        {
            try
            {
                var musica = await context.Musicas.Where(m => m.Id == id)
                        .Include(m => m.Album)
                        .Include(m => m.ArtistaMusicas)
                        .FirstOrDefaultAsync();
                
                for(int i = 0 ; i < musica.ArtistaMusicas.Count ; i++ )
                {
                    var idArtista = musica.ArtistaMusicas[i].ArtistaId;
                    var artista = await context.Artistas
                                    .Where(a => a.Id == idArtista)
                                    .FirstOrDefaultAsync();
                    musica.ArtistaMusicas[i].Artista = artista;
                }

                return musica;

            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}