using System.ComponentModel.DataAnnotations;
using Maia.Models.Abstracts;
using Maia.Models.DTO;

namespace Maia.Models
{
    public class Tab : AnotacaoMusical
    {

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
        
        public Tab() { }
        
        public Tab(TabDTO dto)
        {
            this.MusicaId = dto.MusicaId;
            this.UsuarioId = dto.UsuarioId;
            this.Instrumento = dto.Instrumento;
            this.Titulo = dto.Titulo;
            this.Descricao = dto.Descricao;
            this.Texto = dto.Texto;
            this.TextoHtml = dto.TextoHtml;
            this.Afinacao = dto.Afinacao;
        }

    }
}