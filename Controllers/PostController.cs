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
    [Route("[controller]")]
    public class PostController : ControllerBase
    {

        [HttpGet]
        [Route("{PostId}")]
        [AllowAnonymous]
        public async Task<ActionResult<Post>> Get([FromRoute] int PostId, [FromServices] MaiaContext context)
        {
            try
            {
                return await context.Posts.Include(p => p.Usuario).Where(p => p.PostId == PostId).FirstOrDefaultAsync();
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
                    return Created($"/post/{post.PostId}", post);
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


        [HttpGet]
        [Route("usuario/{UsuarioId}")]
        [AllowAnonymous]
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
        [Route("all")]
        [Authorize]
        public async Task<ActionResult<List<Post>>> GetAll([FromServices] MaiaContext context)
        {
            try
            {
                return await context.Posts.Include(x => x.Usuario).ToListAsync();
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