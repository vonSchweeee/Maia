using System.Collections.Generic;
using System.ComponentModel;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using Maia.Models.DTO;
using Maia.Models.Interfaces;

namespace Maia.Models
{
    public class Comentario : IEntidade<long>
    {
        public long Id { get; set; }
        
        [JsonIgnore] 
        [DefaultValue(true)] 
        public bool Ativo { get; set; } = true;
        public string Texto { get; set; }
        [Required]
        public int UsuarioId { get; set;}
        public Usuario Usuario { get; set;}
        [JsonIgnore]
        public int PostId { get; set; }

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