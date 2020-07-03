using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Maia.Utils.DTO;
using Maia.Utils.Abstracts;

namespace Maia.Utils
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

        public Usuario(string email, string senha, string nome)
        {
            this.Email = email;
            this.Nome = nome;
            this.Senha = senha;
        }
    }
}