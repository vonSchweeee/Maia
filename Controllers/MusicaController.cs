using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Models;
using Maia.Models.DTO;
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
                var musica = await context.Musicas.Where(m => m.Id == id).FirstOrDefaultAsync();
                var album = await context.Albums.Where(a => a.Id == musica.AlbumId).FirstOrDefaultAsync();
                var artista = await context.Artistas.Where(a => a.Id == album.ArtistaId).FirstOrDefaultAsync();

                musica.Album = album;
                musica.ArtistaMusicas = new List<ArtistaMusica>()
                {
                    new ArtistaMusica()
                    {
                        Artista = artista
                    }
                };
                return musica;
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}