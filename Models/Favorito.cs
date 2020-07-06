using System.ComponentModel;
using Maia.Models.Abstracts;
using Maia.Models.DTO;
using Newtonsoft.Json;

namespace Maia.Models
{
    public class Favorito : Entidade<long>
    {
        public int UsuarioId { get; set; }
        // public Usuario Usuario { get; set; }
        public int PostId { get; set; }
        // public Post Post { get; set; }
        public long? ComentarioId { get; set; }
        
        
        public Favorito() { }

        public Favorito(FavoritoDTO dto)
        {
            this.PostId = dto.PostId;
            this.UsuarioId = dto.UsuarioId;
            this.ComentarioId = dto.ComentarioId;
        }
    }
}