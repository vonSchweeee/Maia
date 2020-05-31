using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Models;
using Maia.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Maia.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        public UsuarioController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Usuario>>> Get([FromServices] MaiaContext context)
        {
            return await context.Usuarios.ToListAsync();
        }

        [HttpPost]
        [Route("registro")]
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

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<string>> Login([FromServices] MaiaContext context, [FromBody] UsuarioDTO model)
        {
            if(model.Email != null && model.Senha != null)
            {   
                var usuario = await context.Usuarios
                    .Where(usuario => usuario.Email == model.Email && usuario.Senha == model.Senha).FirstOrDefaultAsync();

                if(usuario != null) {
                    string token = _tokenService.GenerateToken(usuario);
                    return Ok(new {usuario, token});
                }
                else {
                    return Unauthorized("E-mail ou senha incorretos.");
                }
            }
            else
            {
                return BadRequest("E-mail ou senha não informado!");
            }
        }
    }
}