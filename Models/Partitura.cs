using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Abstracts;
using Maia.Models.DTO;
using Newtonsoft.Json;

namespace Maia.Models
{
    public class Partitura : AnotacaoMusical
    {
        [MaxLength(90)]
        public string Titulo { get; set; }
        
        [Required]
        public string UrlPdf { get; set; }
        
        public Partitura() { }

        public Partitura(PartituraDTO dto)
        {
            this.Titulo = dto.Titulo;
            this.UrlPdf = dto.UrlPdf;
            this.MusicaId = dto.MusicaId;
            this.UsuarioId = dto.UsuarioId;
        }
    }
}