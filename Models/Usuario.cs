using System.ComponentModel.DataAnnotations;

namespace Maia.Models
{
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(3)]
        public string Nome { get; set; }

        [Required]
        [MinLength(6)]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        public string UrlImagem { get; set; }
    }
}