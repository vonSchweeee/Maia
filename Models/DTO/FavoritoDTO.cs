using System.ComponentModel.DataAnnotations;

namespace Maia.Utils.DTO
{
    public class FavoritoDTO
    {
        [Required]
        public int UsuarioId { get; set; }
        public int PostId { get; set; }
        public long? ComentarioId { get; set; }

        public Favorito ToFavorito()
        {
            return new Favorito(this);
        }
    }
}