using System.ComponentModel.DataAnnotations;

namespace Maia.Utils.DTO
{
    public class ComentarioDTO
    {
        [Required]
        public string Texto { get; set; }
        [Required]
        public int UsuarioId { get; set; }
        [Required]
        public int PostId { get; set; }


        public Comentario ToComentario()
        {
            return new Comentario(this);
        }
    }
}