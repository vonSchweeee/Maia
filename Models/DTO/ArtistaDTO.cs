using System.ComponentModel.DataAnnotations;

namespace Maia.Models.DTO
{
    public class ArtistaDTO
    {
        [Required]
        public string Nome { get; set; }
        public string Biografia { get; set; }
        [Required]
        public string UrlImagem { get; set; }

        public Artista ToEntity()
        {
            return new Artista(this);
        }
    }
}