namespace Maia.Models
{
    public class Favorito
    {
        public long Id { get; set; }
        public int UsuarioId { get; set; }
        public int PostId { get; set; }
        public long? ComentarioId { get; set; }
    }
}