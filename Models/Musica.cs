using System;

namespace Maia.Models
{
    public class Musica
    {
        public long MusicaId { get; set; }
        public string Titulo { get; set; }
        public string Letra { get; set; }
        public bool Single { get; set; }
        public DateTime DataLanc { get; set; }
        public int ArtistaId { get; set; }
        public int? AlbumId { get; set; }
    }
}