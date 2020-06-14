using System.Collections.Generic;

namespace Maia.Models
{
    public class Artista
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Biografia { get; set; }
        public string UrlImagem { get; set; }
        public ICollection<ArtistaMusica> ArtistasMusicas { get; set; }
        public List<Album> Albuns { get; set; }
    }
}