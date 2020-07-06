using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maia.Data;
using Maia.Models;
using Maia.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Maia.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class TabController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Tab>>> Get([FromQuery] int musicaId, [FromServices] MaiaContext context)
        {
            if (musicaId == 0)
            {
                try
                {
                    return await context.Tabs
                        .OrderBy(t => t.QuantAcessos)
                        .Take(10)
                        .ToListAsync();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
            else
            {
                try
                {
                    return await context.Tabs.Where(t => t.MusicaId == musicaId).ToListAsync();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Tab>> Post([FromBody] TabDTO dto, [FromServices] MaiaContext context)
        {
            try
            {
                var tab = dto.ToEntity();
                context.Tabs.Add(tab);

                if (await context.SaveChangesAsync() > 0)
                {
                    return Created($"tabs/id/{tab.Id}", tab);
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