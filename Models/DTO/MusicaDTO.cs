using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maia.Utils.DTO
{
    public class MusicaDTO
    {
        [Required]
        public string Titulo { get; set; }

        public int? AlbumId { get; set; }
        
        public bool Single { get; set; } = false;
        
        public int? Faixa { get; set; }
        
        public string Duracao { get; set; }
        
        public string UrlImagem { get; set;}
        
        public DateTime DataLanc { get; set; }
        
        public string UrlSpotify { get; set; }
        public string UrlYoutube { get; set; }
        
        public List<ArtistaMusica> ArtistaMusicas { get; set; }

        public Musica ToEntity()
        {
            return new Musica(this);
        }
    }
}