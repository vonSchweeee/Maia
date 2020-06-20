using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Interfaces;
using System.Text.Json.Serialization;

namespace Maia.Models
{
    public class Partitura : IRelMusica
    {
        public long Id { get; set; }
        
        [JsonIgnore] 
        [DefaultValue(true)] 
        public bool Ativo { get; set; } = true;
        [Required]
        public long MusicaId { get; set; }
        public Musica Musica { get; set; }
        
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        
        [Required]
        public string UrlPdf { get; set; }
    }
}