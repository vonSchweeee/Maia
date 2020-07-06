using System.Collections.Generic;
using System.ComponentModel;
using Maia.Models.Abstracts;
using Maia.Models.DTO;
using Newtonsoft.Json;

namespace Maia.Models
{
    public class Artista : Entidade<int>
    {
        public string Nome { get; set; }
        public string Biografia { get; set; }
        public string UrlImagem { get; set; }
        
        public string UrlSpotify { get; set; }

        [JsonIgnore] 
        public int QuantAcessos { get; set; } = 0;
        
        public List<ArtistaMusica> ArtistaMusicas { get; set; }
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