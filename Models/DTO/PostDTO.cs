using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maia.Models.DTO
{
    public class PostDTO
    {
        [Required]
        public string Texto {get; set;}
        public string Titulo { get; set; }
        public bool Avaliacao { get; set; }
        public List<string> Tags { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        public Post ToPost()
        {
            return new Post(Texto, Titulo, Avaliacao, Tags, UsuarioId);
        }
    }
}