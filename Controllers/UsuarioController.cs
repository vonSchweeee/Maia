using System.Collections.Generic;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Maia.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Usuario>>> Get([FromServices] MaiaContext context)
        {
            return await context.Usuarios.ToListAsync();
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Usuario>> Post([FromServices] MaiaContext context, [FromBody] Usuario model)
        {
            if(ModelState.IsValid)
            {
                context.Usuarios.Add(model);
                var res = await context.SaveChangesAsync();
                return Created($"/usuario/${model.UsuarioId}", model);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}