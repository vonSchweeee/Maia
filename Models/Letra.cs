using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Abstracts;
using Maia.Models.DTO;
using Newtonsoft.Json;

namespace Maia.Models
{
    public class Letra : AnotacaoMusical
    {
        [MaxLength(5)]
        [RegularExpression("PT-BR|EN-US", ErrorMessage = "Idioma pode ser apenas 'PT-BR' ou 'EN-US'")]
        public string Idioma { get; set; }

        [Required]
        public string Texto { get; set; }
        
        public string TextoHtml { get; set; }
        
        public Letra() { }

        public Letra(LetraDTO dto)
        {
            this.UsuarioId = dto.UsuarioId;
            this.MusicaId = dto.MusicaId;
            this.Idioma = dto.Idioma;
            this.Texto = dto.Texto;
            this.TextoHtml = dto.TextoHtml;
        }
    }
}