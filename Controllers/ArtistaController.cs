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

namespace Maia
{
    [ApiController]
    [Route("[controller]s")]
    public class ArtistaController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Artista>>> Get([FromQuery] PageParameters parameters, [FromServices] MaiaContext context)
        {
            try
            {
                return Ok(
                    await context.Artistas
                        .Skip((parameters.Page - 1) * parameters.Size)
                        .Take(parameters.Size)
                        .ToListAsync()
                );
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }
        
        
        [HttpPost]
        [Authorize(Roles = "adm")]
        public async Task<ActionResult> Post([FromBody] ArtistaDTO model, [FromServices] MaiaContext context)
        {
            try
            {
                var artista = model.ToEntity();

                context.Artistas.Add(artista);

                if (await context.SaveChangesAsync() > 0)
                {
                    return Created($"/artistas/{artista.Id}", artista);
                }

                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }
    }
}