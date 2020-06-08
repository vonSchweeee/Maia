using System.Collections.Generic;

namespace Maia.Models
{
    public class Album
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public int ArtistaId { get; set; }
        public Artista Artista { get; set; }
        public List<Musica> Musicas { get; set; }
    }
}