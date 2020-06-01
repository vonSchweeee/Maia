using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Maia.Models
{
    public class Post
    {
        public Post(string texto, bool avaliacao, List<string> tags, int usuarioId, long? musicaId, int? albumId)
        {
            this.Texto = texto;
            this.Avaliacao = avaliacao;
            this.Tags = tags;
            this.UsuarioId = usuarioId;
            this.MusicaId = musicaId;
            this.AlbumId = albumId;
            this.DataPub = DateTime.Now;
        }
        
        public int PostId { get; set; }
        public string Titulo { get; set; }
        public string Texto { get; set; }
        public DateTime DataPub { get; set; }
        public bool Avaliacao { get; set; }
        public List<string> Tags {get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public long? MusicaId { get; set; }
        public Musica Musica { get; set;}
        public int? AlbumId { get; set;}
        public Album Album { get; set; }
        public List<Comentario> Comentarios { get; set;}
    }

}