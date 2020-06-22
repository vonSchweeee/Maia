using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Interfaces;
using System.Text.Json.Serialization;
using Maia.Models.DTO;

namespace Maia.Models
{
    public class Album : IEntidade<int>
    {
        public int Id { get; set; }
        
        [JsonIgnore] 
        [DefaultValue(true)] 
        public bool Ativo { get; set; } = true;
        
        [Required]
        public string Titulo { get; set; }
        
        [Required]
        public int ArtistaId { get; set; }
        
        public string UrlImagem { get; set; }
        public string UrlSpotify { get; set; }
        
        public DateTime DataLanc { get; set; }
        
        [JsonIgnore] 
        public int QuantAcessos { get; set; } = 0;
        
        
        public Artista Artista { get; set; }
        public List<Musica> Musicas { get; set; }
        
        
        [Range(0, 10)]
        public byte MediaNota { get; set; }
        
        public int QuantAvaliacoes { get; set; } = 0;
        
        public Album() { }

        public Album(AlbumDTO dto)
        {
            this.Titulo = dto.Titulo;
            this.ArtistaId = dto.ArtistaId;
            this.UrlImagem = dto.UrlImagem;
            this.UrlSpotify = dto.UrlSpotify;
            this.DataLanc = dto.DataLanc;
            this.Musicas = new List<Musica>();
            foreach (var musicaDto in dto.Musicas)
            {
                musicaDto.UrlImagem = this.UrlImagem;
                this.Musicas.Add(musicaDto.ToEntity());
            }
        }
    }
}