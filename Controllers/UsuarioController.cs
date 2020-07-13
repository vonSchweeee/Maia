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
        private readonly HasherService _hasherService;

        public UsuarioController(ITokenService tokenService)
        {
            _tokenService = tokenService;
            _hasherService = new HasherService();
        }

        [HttpGet]
        [Route("usuario/all")]
        [Authorize(Roles = "adm")]
        public async Task<ActionResult<List<Usuario>>> Get([FromServices] MaiaContext context)
        {
            return await context.Usuarios.ToListAsync();
        }
        
        [HttpGet]
        [Route("usuarios/admin")]
        [Authorize(Roles = "adm")]
        public async Task<ActionResult<List<Usuario>>> GetAdms([FromServices] MaiaContext context)
        {
            return await context
                .Usuarios
                .Where(u => u.Role == "adm")
                .ToListAsync();
        }
        
        [HttpGet]
        [Route("usuario/id/{id}")]
        [Authorize]
        public async Task<ActionResult<Usuario>> GetById([FromRoute] int id, [FromServices] MaiaContext context)
        {
            return await
                context.Usuarios
                    .Where(u => u.Id == id)
                    .FirstOrDefaultAsync();
        }

        [HttpPost]
        [Route("registro")]
        [AllowAnonymous]
        public async Task<ActionResult<Usuario>> Registrar([FromServices] MaiaContext context, [FromBody] UsuarioDTO model)
        {
            if(ModelState.IsValid)
            {
                var usuario = model.ToEntity(_hasherService);
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
        public async Task<ActionResult<string>> Login([FromServices] MaiaContext context, [FromBody] UsuarioDTO dto)
        {
            if(dto.Email != null && dto.Senha != null)
            {   
                var usuario = await context.Usuarios
                    .Where(usuario => usuario.Email == dto.Email).FirstOrDefaultAsync();

                if(usuario != null) {
                    if(_hasherService.VerifyPassword(usuario.Senha, dto.Senha)) 
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

        [HttpGet]
        [Route("usuarios")]
        [Authorize(Roles = "adm")]
        public async Task<ActionResult<List<Usuario>>> GetByNome([FromQuery] string nome, [FromServices] MaiaContext context)
        {
            return await context.Usuarios
                .FromSqlRaw($"SELECT * FROM maia.usuarios WHERE Nome LIKE '%{nome}%' AND Role != 'adm'")
                .ToListAsync();
        }

        [HttpPatch]
        [Route("usuarios/adm/id/{id}")]
        [Authorize(Roles = "adm")]
        public async Task<ActionResult> SetAsAdm([FromRoute] int id, [FromServices] MaiaContext context)
        {
            var usuario = await context.Usuarios
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync();

            usuario.Role = "adm";

            context.Update(usuario);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}