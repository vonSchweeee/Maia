using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Models;
using Maia.Models.DTO;
using Maia.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Maia.Controllers
{
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        public UsuarioController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpGet]
        [Route("usuario/all")]
        [Authorize(Roles = "adm")]
        public async Task<ActionResult<List<Usuario>>> Get([FromServices] MaiaContext context)
        {
            return await context.Usuarios.ToListAsync();
        }

        [HttpPost]
        [Route("registro")]
        [AllowAnonymous]
        public async Task<ActionResult<Usuario>> Post([FromServices] MaiaContext context, [FromBody] Usuario model)
        {
            if(ModelState.IsValid)
            {
                context.Usuarios.Add(model);
                var res = await context.SaveChangesAsync();
                return Created($"/usuario/${model.Id}", model);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> Login([FromServices] MaiaContext context, [FromBody] UsuarioDTO model)
        {
            if(model.Email != null && model.Senha != null)
            {   
                var usuario = await context.Usuarios
                    .Where(usuario => usuario.Email == model.Email).FirstOrDefaultAsync();

                if(usuario != null) {
                    if(usuario.Senha == model.Senha) 
                    {
                        string token = _tokenService.GenerateToken(usuario);
                        return Ok(new {usuario, token});
                    }
                    else
                    {
                        return Unauthorized("Senha incorreta.");
                    }
                }
                else {
                    return Unauthorized("Usuário não existe.");
                }
            }
            else
            {
                return BadRequest("E-mail ou senha não informado!");
            }
        }
    }
}