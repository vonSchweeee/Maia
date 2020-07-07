using System.ComponentModel.DataAnnotations;

namespace Maia.Models.DTO
{
    public class PartituraDTO
    {
        public long MusicaId { get; set; }
        public int UsuarioId { get; set; }
        [MaxLength(90)]
        public string Titulo { get; set; }
        [Required]
        public string UrlPdf { get; set; }

        public Partitura ToEntity()
        {
            return new Partitura(this);
        }
    }
}