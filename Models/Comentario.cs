using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

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

        public Comentario(string texto, int usuarioId, int postId)
        {
            this.Texto = texto;
            this.UsuarioId = usuarioId;
            this.PostId = postId;
        }
    }
}