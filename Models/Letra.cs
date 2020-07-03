using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Utils.Abstracts;
using Newtonsoft.Json;

namespace Maia.Utils
{
    public class Letra : AnotacaoMusical
    {
        [MaxLength(5)]
        [RegularExpression("PT-BR|EN-US", ErrorMessage = "Idioma pode ser apenas 'PT-BR' ou 'EN-US'")]
        public string Idioma { get; set; }

        [Required]
        public string Texto { get; set; }
        
        public string TextoHtml { get; set; }
    }
}