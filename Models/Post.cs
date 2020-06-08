using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Maia.Models
{
    public class Post
    {   
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Texto { get; set; }
        public int QuantFav { get; set; } = 0;
        public int QuantCmt { get; set; } = 0;
        public DateTime DataPub { get; set; }
        public List<string> Tags {get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        [JsonIgnore]
        public bool Ativo { get; set; }
        public List<Favorito> Favoritos { get; set; }
        public List<Comentario> Comentarios { get; set;}

        public Post(string texto, string titulo, bool avaliacao, List<string> tags, int usuarioId)
        {
            this.Texto = texto;
            this.Titulo = titulo;
            this.Tags = tags;
            this.UsuarioId = usuarioId;
            this.DataPub = DateTime.Now;
            this.Ativo = true;
        }
    }

}