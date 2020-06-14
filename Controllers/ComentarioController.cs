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
    public class ComentarioController : ControllerBase
    {
        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<Comentario>> Post([FromBody] ComentarioDTO model,[FromServices] MaiaContext context)
        {
            if (! ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var comentario = new Comentario(model.Texto, model.UsuarioId, model.PostId);
                context.Add(comentario);
                var post = context.Posts.FirstOrDefault(p => p.Id == comentario.PostId);
                post.QuantCmt = post.QuantCmt + 1;
                if(await context.SaveChangesAsync() > 0)
                {
                    return Created($"/comentarios/{comentario.Id}", comentario);
                    
                }    
                return BadRequest(ModelState);   
            }
            catch(Exception)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError, "Falha no banco de dados"
                );
            }
            
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<List<Comentario>>> Get([FromQuery] int postId,[FromServices] MaiaContext context)
        {
            try
            {
                return await context.Comentarios.Where(c => c.PostId == postId)
                    .Include(c => c.Usuario).ToListAsync();
            }
            catch(Exception)
            {

            }
            return BadRequest();
        }
    }
}