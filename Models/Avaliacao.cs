using System.ComponentModel.DataAnnotations;

namespace Maia.Models
{
    public class Avaliacao : Publicacao
    {
        [Range(1.0, 5.0)]
        public float Nota { get; set; }
        public long MusicaId { get; set; }
        public int AlbumId { get; set; }
    }
}