using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Abstracts;
using Newtonsoft.Json;
using Maia.Models.DTO;
using Maia.Services;

namespace Maia.Models
{
    
    public class Usuario : Entidade<int>
    {
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

        [Range(typeof(string), "adm", "user")]
        public string Role { get; set; } = "user";
        
        public string UrlImagem { get; set; }
        
        public Usuario() { }

        public Usuario(UsuarioDTO dto, HasherService service)
        {
            this.Email = dto.Email;
            this.Nome = dto.Nome;
            this.Senha = service.HashPassword(dto.Senha);
        }
    }
}