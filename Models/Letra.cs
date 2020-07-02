using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Interfaces;
using Newtonsoft.Json;

namespace Maia.Models
{
    public class Letra : IRelMusica
    {
        public long Id { get; set; }
        [JsonIgnore] 
        [DefaultValue(true)] 
        public bool Ativo { get; set; } = true;

        [Required]
        public long MusicaId { get; set; }
        public Musica Musica { get; set; }
        
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        
        [MaxLength(5)]
        [RegularExpression("PT-BR|EN-US", ErrorMessage = "Idioma pode ser apenas 'PT-BR' ou 'EN-US'")]
        public string Idioma { get; set; }

        [Required]
        public string Texto { get; set; }
        
        public string TextoHtml { get; set; }
        
        [JsonIgnore] 
        public int QuantAcessos { get; set; } = 0;
    }
}