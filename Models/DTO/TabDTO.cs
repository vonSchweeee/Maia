using System.ComponentModel.DataAnnotations;

namespace Maia.Models.DTO
{
    public class TabDTO
    {
        public long MusicaId { get; set; }
        public int UsuarioId { get; set; }
        
        [Required]
        [MaxLength(90)]
        public string Titulo { get; set; }
        
        [MaxLength(140)]
        public string Descricao { get; set; }

        public string Texto { get; set; }
        public string TextoHtml { get; set; }
        
        [MaxLength(8)]
        public string Afinacao { get; set; }
        

        [RegularExpression("Guitarra|Baixo|Violao")]
        public string Instrumento { get; set; } = "Guitarra";

        public Tab ToEntity()
        {
            return new Tab(this);
        }
    }
}