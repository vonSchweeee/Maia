using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maia.Utils.DTO
{
    public class PostDTO
    {
        [Required]
        public string Texto {get; set;}
        public string Titulo { get; set; }
        public List<string> Tags { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        public Post ToPost()
        {
            return new Post(Texto, Titulo, Tags, UsuarioId);
        }
    }
}