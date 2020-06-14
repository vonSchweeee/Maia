using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using Maia.Models.DTO;

namespace Maia.Models
{
    public class Comentario
    {
        public long Id { get; set; }
        public string Texto { get; set; }
        [Required]
        public int UsuarioId { get; set;}
        public Usuario Usuario { get; set;}
        [JsonIgnore]
        public int PostId { get; set; }
        [JsonIgnore]
        public bool Ativo { get; set; } = true;
        
        public List<Resposta> Respostas { get; set; }

        public Comentario() { }

        public Comentario(ComentarioDTO dto)
        {
            this.UsuarioId = dto.UsuarioId;
            this.PostId = dto.PostId;
            this.Texto = dto.Texto;
        }
    }
}