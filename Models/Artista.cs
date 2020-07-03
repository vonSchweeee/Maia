using System.Collections.Generic;
using System.ComponentModel;
using Newtonsoft.Json;
using Maia.Utils.Abstracts;
using Maia.Utils.DTO;

namespace Maia.Utils
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