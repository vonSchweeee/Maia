using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Abstracts;
using Newtonsoft.Json;

namespace Maia.Models
{
    public class Partitura : AnotacaoMusical
    {
        [MaxLength(90)]
        public string Titulo { get; set; }
        
        [Required]
        public string UrlPdf { get; set; }
    }
}