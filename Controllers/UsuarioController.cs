using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        public async Task<ActionResult<Usuario>> Registrar([FromServices] MaiaContext context, [FromBody] UsuarioDTO model)
        {
            if(ModelState.IsValid)
            {
                var usuario = new Usuario(model.Email, model.Senha, model.Nome);
                context.Usuarios.Add(usuario);
                var res = await context.SaveChangesAsync();
                string token = _tokenService.GenerateToken(usuario);
                return Ok(new {usuario, token});
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
        
        [HttpPatch]
        [Route("usuarios/propic")]
        [Authorize]
        public async Task<ActionResult<Usuario>> UpdatePropic([FromBody] UsuarioPropicDTO dto, [FromServices] MaiaContext context)
        {
            try
            {
                var usuarioId = int.Parse(
                    HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.Sid).FirstOrDefault().Value
                );
                if (usuarioId != dto.Id)
                    return Forbid();

                var usuario = await context.Usuarios.Where(u => u.Id == dto.Id).FirstOrDefaultAsync();
                usuario.UrlImagem = dto.UrlImagem;

                if (await context.SaveChangesAsync() > 0)
                {
                    return Ok(usuario);
                }

                return BadRequest();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}