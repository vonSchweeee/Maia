using System;
using System.Collections.Generic;

namespace Maia.Models
{
    public class Musica
    {
        public long Id { get; set; }
        public string Titulo { get; set; }
        public string Letra { get; set; }
        public bool Single { get; set; }
        public DateTime DataLanc { get; set; }
        public ICollection<ArtistaMusica> ArtistasMusicas { get; set; }
        public int? AlbumId { get; set; }
    }
}