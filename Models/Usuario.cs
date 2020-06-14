using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Maia.Models.DTO;
using Maia.Models.Interfaces;

namespace Maia.Models
{
    
    public class Usuario : IEntidade<int>
    {
        [Key]
        public int Id { get; set; }        

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

        [JsonIgnore]
        [DefaultValue(true)]
        public bool Ativo { get; set; } = true;

        public Usuario(string email, string senha, string nome)
        {
            this.Email = email;
            this.Nome = nome;
            this.Senha = senha;
        }
    }
}