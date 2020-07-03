using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Utils.Abstracts;
using Newtonsoft.Json;

namespace Maia.Utils
{
    public class Partitura : AnotacaoMusical
    {
        [MaxLength(90)]
        public string Titulo { get; set; }
        
        [Required]
        public string UrlPdf { get; set; }
    }
}