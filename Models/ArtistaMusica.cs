namespace Maia.Models
{
    public class ArtistaMusica
    {
        public int ArtistaId { get; set; }
        public Artista Artista { get; set; }
        public long MusicaId { get; set; }
        public Musica Musica { get; set; }
    }
}