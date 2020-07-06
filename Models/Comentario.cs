using System;
using System.Collections.Generic;
using System.ComponentModel;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Abstracts;
using Maia.Models.DTO;

namespace Maia.Models
{
    public class Comentario : Entidade<long>
    { 
        public string Texto { get; set; }
        
        [Required]
        public int UsuarioId { get; set;}
        public Usuario Usuario { get; set;}
        
        [JsonIgnore]
        public int PostId { get; set; }

        public DateTime DataPub { get; set; } = DateTime.Now;
        
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