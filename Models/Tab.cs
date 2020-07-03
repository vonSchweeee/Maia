using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Maia.Utils.Abstracts;

namespace Maia.Utils
{
    public class Tab : AnotacaoMusical
    {
        [MaxLength(90)]
        public string Titulo { get; set; }
        
        public string Texto { get; set; }
        public string TextoHtml { get; set; }
        
        [MaxLength(8)]
        public string Afinacao { get; set; }
        
        [MaxLength(140)]
        public string Descricao { get; set; }
    }
}