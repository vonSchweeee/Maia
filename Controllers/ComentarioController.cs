using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Models;
using Maia.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Maia.Utils;

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
                var comentario = model.ToComentario();
                context.Add(comentario);
                var post = context.Posts.FirstOrDefault(p => p.Id == comentario.PostId);
                post.QuantCmt = post.QuantCmt + 1;
                if(await context.SaveChangesAsync() > 0)
                {
                    return Created($"/comentarios/{comentario.Id}", comentario);
                    
                }    
                return BadRequest(ModelState);   
            }
            catch(Exception e)
            {
                Console.WriteLine(e);

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

        [HttpPatch]
        [Authorize]
        public async Task<ActionResult> Update([FromBody] Comentario comentario, [FromServices] MaiaContext context)
        {
            try
            {
                var usuarioId = int.Parse(
                    HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.Sid).FirstOrDefault().Value
                );
                if (comentario.UsuarioId == usuarioId)
                {
                    context.Comentarios.Update(comentario);
                    await context.SaveChangesAsync();
                    return Ok();
                }
                
                return Forbid();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpDelete]
        [Authorize]
        [Route("id/{id}")]
        public async Task<ActionResult> Delete([FromRoute] long id, [FromQuery] int postId, [FromServices] MaiaContext context)
        {
            if (postId == 0)
                return BadRequest();
            try
            {
                Comentario comentario = new Comentario()
                {
                    Id = id
                };

                var post = await context.Posts.Where(p => p.Id == postId).FirstOrDefaultAsync();
                post.QuantCmt--;
                context.Remove(comentario);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}