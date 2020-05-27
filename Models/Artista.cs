using System.Collections.Generic;

namespace Maia.Models
{
    public class Artista
    {
        public int ArtistaId { get; set; }
        public string Nome { get; set; }
        public string UrlImagem { get; set; }
        public List<Musica> Musicas { get; set; }
        public List<Album> Albuns { get; set; }
    }
}