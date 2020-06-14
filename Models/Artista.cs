using System.Collections.Generic;
using System.ComponentModel;
using Maia.Models.Interfaces;
using System.Text.Json.Serialization;

namespace Maia.Models
{
    public class Artista : IEntidade<int>
    {
        public int Id { get; set; }
        
        [JsonIgnore]
        [DefaultValue(true)]
        public bool Ativo { get; set; }
        public string Nome { get; set; }
        public string Biografia { get; set; }
        public string UrlImagem { get; set; }
        public ICollection<ArtistaMusica> ArtistasMusicas { get; set; }
        public List<Album> Albuns { get; set; }
    }
}