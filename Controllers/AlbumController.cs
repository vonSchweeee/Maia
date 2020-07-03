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
    [ApiController]
    [Route("albuns")]
    public class AlbumController : ControllerBase
    {
        [HttpPost]
        [Authorize(Roles = "adm")]
        public async Task<ActionResult<Album>> Post([FromBody] AlbumDTO model, [FromServices] MaiaContext context)
        {
            var album = model.ToEntity();
            try
            {
                context.Add(album);
                var artista = await context.Artistas.Where(a => a.Id == album.ArtistaId).FirstOrDefaultAsync();
                foreach(var musica in album.Musicas){
                    context.ArtistaMusicas.Add(new ArtistaMusica() { Artista = artista, Musica = musica });
                }

                if (await context.SaveChangesAsync() > 0)
                {
                    return Created($"albuns/id/{album.Id}", album);
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
        public async Task<ActionResult<List<Album>>> Get([FromQuery] PageParameters parameters, [FromServices] MaiaContext context)
        {
            int size = parameters.Size;
            int page = parameters.Page;
            try 
            {
                return await context.Albums
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
        public async Task<ActionResult<List<Album>>> GetById([FromRoute] int id, [FromServices] MaiaContext context, [FromQuery] bool includeMusics)
        {
            try
            {
                if(includeMusics)
                    return await context.Albums
                        .Where(a => a.Id == id)
                        .Include(a => a.Musicas)
                        .ToListAsync();
                
                else
                    return await context.Albums.Where(a => a.Id == id).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}