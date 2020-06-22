using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maia.Models.DTO
{
    public class AlbumDTO
    {
        [Required]
        public string Titulo { get; set; }
        
        [Required]
        public int ArtistaId { get; set; }
        
        [Required]
        public string UrlImagem { get; set; }
        
        public string UrlSpotify { get; set; }
        
        public DateTime DataLanc { get; set; }

        [Required]
        public List<MusicaDTO> Musicas { get; set; }

        public Album ToEntity()
        {
            return new Album(this);
        }
    }
}