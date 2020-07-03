namespace Maia.Models
{
    public class ArtistaMusica
    {
        public int ArtistaId { get; set; }
        public virtual Artista Artista { get; set; }
        public long MusicaId { get; set; }
        public virtual Musica Musica { get; set; }
    }
}