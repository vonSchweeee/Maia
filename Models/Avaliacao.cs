using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maia.Utils
{
    public class Avaliacao : Post
    {
        public Avaliacao(string texto, string titulo, List<string> tags, int usuarioId) : base(texto, titulo, tags, usuarioId) {}
        [Range(0, 10)]
        public byte Nota { get; set; }
        public long? MusicaId { get; set; }
        public Musica Musica { get; set; }
        public int? AlbumId { get; set; }
        public Album Album { get; set; }
    }
}