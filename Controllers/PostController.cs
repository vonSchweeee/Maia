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
                return await context.Posts.Include(p => p.Usuario).Where(p => p.PostId == postId).FirstOrDefaultAsync();
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
            try 
            {
                var post = model.ToPost();
                context.Add(post);
                if(await context.SaveChangesAsync() > 0)
                {
                    return Created($"/posts/{post.PostId}", post);
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
            var post = await context.Posts.Where(p => p.PostId == postId).FirstOrDefaultAsync();
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
                
                return await context.Posts.Include(p => p.Usuario)
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
    }
}