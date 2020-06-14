using System.ComponentModel;
using Maia.Models.DTO;
using Maia.Models.Interfaces;
using System.Text.Json.Serialization;

namespace Maia.Models
{
    public class Favorito : IEntidade<long>
    {
        public long Id { get; set; }
        public int UsuarioId { get; set; }
        // public Usuario Usuario { get; set; }
        public int PostId { get; set; }
        // public Post Post { get; set; }
        public long? ComentarioId { get; set; }

        [JsonIgnore]
        [DefaultValue(true)]
        public bool Ativo { get; set; }
        
        public Favorito() { }

        public Favorito(FavoritoDTO dto)
        {
            this.PostId = dto.PostId;
            this.UsuarioId = dto.UsuarioId;
            this.ComentarioId = dto.ComentarioId;
        }
    }
}