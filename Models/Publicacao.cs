using System;
using System.Collections.Generic;

namespace Maia.Models
{
    public class Publicacao
    {
        public int PublicacaoId { get; set; }
        public string Texto { get; set; }
        public DateTime DataPub { get; set; }
        public bool Avaliacao { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public long MusicaId { get; set; }
        public int AlbumId { get; set;}
        public List<Comentario> Comentarios { get; set;} 
    }
}