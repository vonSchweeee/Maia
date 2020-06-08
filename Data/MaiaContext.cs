using System.Collections.Generic;
using System.Linq;
using Maia.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Maia.Data
{
    public class MaiaContext : DbContext
    {
        public MaiaContext(DbContextOptions options) : base(options) { }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Artista> Artistas { get; set;}
        public DbSet<Album> Albums {get; set;}
        public DbSet<Musica> Musicas { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Avaliacao> Avaliacoes { get; set; }
        public DbSet<Favorito> Favoritos { get; set; }
        public DbSet<Comentario> Comentarios { get; set; }
        public DbSet<Resposta> Respostas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var separator = new []{','};
            var valueConverter = new ValueConverter<List<string>, string>(v => string.Join(',', v), v => v.Split(separator).ToList());
            modelBuilder.Entity<Post>().Property(nameof(Post.Tags)).HasConversion(valueConverter);
            modelBuilder.Entity<Post>().Property(nameof(Avaliacao.Tags)).HasConversion(valueConverter);

            modelBuilder.Entity<ArtistaMusica>()
                .HasKey(am => new { am.ArtistaId, am.MusicaId});
            modelBuilder.Entity<ArtistaMusica>()
                .HasOne(am => am.Artista)
                .WithMany(a => a.ArtistasMusicas)
                .HasForeignKey(am => am.ArtistaId);
            modelBuilder.Entity<ArtistaMusica>()
                .HasOne(am => am.Musica)
                .WithMany(m => m.ArtistasMusicas)
                .HasForeignKey(am => am.MusicaId);
        }
        
    }
}