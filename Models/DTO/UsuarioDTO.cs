using System.ComponentModel.DataAnnotations;

namespace Maia.Utils.DTO
{
    public class UsuarioDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [MinLength(3)]
        public string Nome { get; set; }

        [Required]
        [MinLength(6)]
        [DataType(DataType.Password)]
        public string Senha { get; set; }
    }
}