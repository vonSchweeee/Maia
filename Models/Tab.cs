using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Maia.Models.Interfaces;

namespace Maia.Models
{
    public class Tab : IRelMusica
    {
        public long Id { get; set; }
        
        [JsonIgnore] 
        [DefaultValue(true)] 
        public bool Ativo { get; set; } = true;
        
        [Required]
        public long MusicaId { get; set; }
        public Musica Musica { get; set; }
        
        public int UsuarioId { get; set; }
        
        [MaxLength(90)]
        public string Titulo { get; set; }
        
        public Usuario Usuario { get; set; }
        
        public string Texto { get; set; }
        public string TextoHtml { get; set; }
        
        [MaxLength(8)]
        public string Afinacao { get; set; }
        
        [MaxLength(140)]
        public string Descricao { get; set; }

        [JsonIgnore] 
        public int QuantAcessos { get; set; } = 0;
    }
}