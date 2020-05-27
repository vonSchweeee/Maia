using Maia.Models;
using Microsoft.EntityFrameworkCore;

namespace Maia.Data
{
    public class MaiaContext : DbContext
    {
        public MaiaContext(DbContextOptions options) : base(options) { }
        public DbSet<Usuario> Usuarios { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);

        //     modelBuilder.Entity<>
        // }
        
    }
}