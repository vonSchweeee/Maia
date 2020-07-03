using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class PostController : ControllerBase
    {

        [HttpGet]
        [Route("id/{postId}")]
        [AllowAnonymous]
        public async Task<ActionResult<Post>> Get([FromRoute] int postId, [FromServices] MaiaContext context)
        {
            try
            {
                return await context.Posts
                        .Include(p => p.Usuario)
                        .Include(p => p.Comentarios)
                        .Where(p => p.Id == postId).FirstOrDefaultAsync();
            }
            catch(Exception)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError, "Falha no banco de dados"
                );
            }
        }

        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] PostDTO model, [FromServices] MaiaContext context)
        {
            if(ModelState.IsValid)
                try 
                {
                    var post = model.ToPost();
                    context.Add(post);
                    if(await context.SaveChangesAsync() > 0)
                    {
                        return Created($"/posts/{post.Id}", post);
                    }
                }
                catch(Exception)
                {
                    return this.StatusCode(
                        StatusCodes.Status500InternalServerError, "Falha no banco de dados"
                    );
                }

            return BadRequest();
        }

        [HttpDelete]
        [Route("id/{postId}")]
        [Authorize]
        public async Task<ActionResult<string>> Delete([FromRoute] int postId, [FromServices] MaiaContext context)
        {
            var usuarioId = int.Parse(
                HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.Sid).FirstOrDefault().Value
            );
            var post = await context.Posts.Where(p => p.Id == postId).FirstOrDefaultAsync();
            if (post != null)
            {
                if (post.UsuarioId == usuarioId)
                {
                    context.Posts.Remove(post);
                    await context.SaveChangesAsync();
                    return Ok();
                }
                return Forbid();
            }
            return NoContent();
        }


        [HttpGet]
        [Route("usuario/{UsuarioId}")]
        [Authorize]
        public async Task<ActionResult<List<Post>>> GetByUsuarioId([FromRoute] int UsuarioId, [FromServices] MaiaContext context)
        {
            try
            {
                return await context.Posts.Where(p => p.UsuarioId == UsuarioId).ToListAsync();
            }
            catch(Exception)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError, "Falha no banco de dados"
                );
            }
        }

        [HttpGet]
        [Route("tag/{tag}")]
        public async Task<ActionResult<List<Post>>> GetByTag([FromQuery] PageParameters pageParameters, [FromRoute] string tag, [FromServices] MaiaContext context)
        {
            try
            {
                return await context.Posts
                    .FromSqlRaw($"SELECT * FROM maia.posts WHERE FIND_IN_SET('{tag}', Tags)")
                    .OrderByDescending(p => p.DataPub)
                    .Skip((pageParameters.Page - 1) * pageParameters.Size)
                    .Take(pageParameters.Size)
                    .ToListAsync();
            }
            catch(Exception)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError, "Falha no banco de dados"
                );
            }
        }

        [HttpGet]
        [Route("all")]
        [Authorize]
        public async Task<ActionResult<List<Post>>> GetAll([FromQuery] PageParameters pageParameters, [FromServices] MaiaContext context)
        {
            try
            {
                int size = pageParameters.Size;
                int page = pageParameters.Page;

                var usuarioId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid)?.Value);
                
                var posts = await context.Posts
                    .Include(p => p.Usuario)
                    .OrderByDescending(p => p.DataPub)
                    .Skip((page - 1) * size)
                    .Take(size)
                    .ToListAsync();

                foreach (var post in posts)
                {
                    var like = await context.Favoritos.FirstOrDefaultAsync(
                        f => f.UsuarioId == usuarioId && f.PostId == post.Id && f.Ativo
                        );

                    // Por algum motivo apenas trazer esse comentário faz com que ele seja adicionado ao JSON.
                    await context.Comentarios
                        .Where(c => c.PostId == post.Id)
                        .FirstOrDefaultAsync();

                    if (like != null)
                        post.Favoritado = true;

                    // if (comentario != null)
                    //     post.Comentarios.Add(comentario);
                }

                return posts;
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError, "Falha no banco de dados"
                );
            }
        }
    }
}