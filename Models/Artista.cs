using System.Collections.Generic;
using System.ComponentModel;
using Maia.Models.Interfaces;
using System.Text.Json.Serialization;
using Maia.Models.DTO;

namespace Maia.Models
{
    public class Artista : IEntidade<int>
    {
        public int Id { get; set; }

        [JsonIgnore] 
        [DefaultValue(true)] 
        public bool Ativo { get; set; } = true;
        public string Nome { get; set; }
        public string Biografia { get; set; }
        public string UrlImagem { get; set; }
        
        
        [JsonIgnore] 
        public int QuantAcessos { get; set; } = 0;
        
        public ICollection<ArtistaMusica> ArtistasMusicas { get; set; }
        public List<Album> Albuns { get; set; }
        
        public Artista() { }

        public Artista(ArtistaDTO dto)
        {
            this.Nome = dto.Nome;
            this.Biografia = dto.Biografia;
            this.UrlImagem = dto.UrlImagem;
        }
        
    }
}