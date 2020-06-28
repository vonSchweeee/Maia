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
    [Route("[controller]s")]
    public class MusicaController
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Musica>>> Get([FromQuery] PageParameters pageParameters, [FromServices] MaiaContext context)
        {
            int size = pageParameters.Size;
            int page = pageParameters.Page;
            try 
            {
                return await context.Musicas
                    .Skip((page - 1) * size)
                    .Take(size)
                    .ToListAsync();
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}