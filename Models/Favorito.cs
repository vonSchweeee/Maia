using Maia.Models.DTO;

namespace Maia.Models
{
    public class Favorito
    {
        public long Id { get; set; }
        public int UsuarioId { get; set; }
        // public Usuario Usuario { get; set; }
        public int PostId { get; set; }
        // public Post Post { get; set; }
        public long? ComentarioId { get; set; }

        public bool Ativo { get; set; } = true;
        
        public Favorito() { }

        public Favorito(FavoritoDTO dto)
        {
            this.PostId = dto.PostId;
            this.UsuarioId = dto.UsuarioId;
            this.ComentarioId = dto.ComentarioId;
        }
    }
}