using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Maia.Models
{
    public class Comentario
    {
        public long Id { get; set; }
        public string Texto { get; set; }
        public int UsuarioId { get; set;}
        public Usuario Usuario { get; set;}
        public int PostId { get; set; }
        public Post Post { get; set; }
        [JsonIgnore]
        public bool Ativo { get; set; }
        public List<Resposta> Respostas { get; set; }
    }
}