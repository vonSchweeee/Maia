using System.Collections.Generic;

namespace Maia.Models
{
    public class Album
    {
        public int AlbumId { get; set; }
        public string Titulo { get; set; }
        public int ArtistaId { get; set; }
        public List<Musica> Musicas { get; set; }
    }
}