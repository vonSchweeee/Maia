using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public string Senha { get; set; }

        [JsonIgnore]
        [Range(typeof(string), "adm", "user")]
        public string Role { get; set; }
        
        public string UrlImagem { get; set; }
    }
}