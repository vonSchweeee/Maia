using System.ComponentModel.DataAnnotations;

namespace Maia.Utils.DTO
{
    public class LetraDTO
    {
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

        public Letra ToEntity()
        {
            return new Letra(this);
        }
    }
}