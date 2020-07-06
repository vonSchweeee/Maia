using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Maia.Models.Abstracts
{
    public abstract class AnotacaoMusical : Entidade<int>
    {
        public long MusicaId { get; set; }
        public Musica Musica { get; set; }
        
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        
        [JsonIgnore] 
        public int QuantAcessos { get; set; } = 0;
    }
}