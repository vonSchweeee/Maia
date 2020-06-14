using System;
using System.Linq;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Maia.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class FavoritoController : ControllerBase
    {
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Favoritar([FromBody] FavoritoDTO model, [FromServices] MaiaContext context)
        {
            try
            {
                var favorito = model.ToFavorito();
                context.Favoritos.Add(favorito);
                var post = context.Posts.Where(p => p.Id == model.PostId).FirstOrDefault();
                post.QuantFav = post.QuantFav + 1;
                if (await context.SaveChangesAsync() > 0)
                {
                    return Ok();
                }

                return BadRequest();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpDelete]
        [Authorize]
        public async Task<ActionResult> Desfavoritar([FromBody] FavoritoDTO model, [FromServices] MaiaContext context)
        {
            try
            {
                context.Favoritos.FirstOrDefault(
                    f => f.PostId == model.PostId && f.UsuarioId == model.UsuarioId
                ).Ativo = false;
                context.Posts.FirstOrDefault(p => p.Id == model.PostId).QuantFav--;
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}