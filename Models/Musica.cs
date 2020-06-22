using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Interfaces;
using System.Text.Json.Serialization;
using Maia.Models.DTO;

namespace Maia.Models
{
    public class Musica : IEntidade<long>
    {
        public long Id { get; set; }
        
        [JsonIgnore] 
        [DefaultValue(true)] 
        public bool Ativo { get; set; } = true;
        
        [Required]
        public string Titulo { get; set; }

        public bool Single { get; set; } = false;
        public int? Faixa { get; set; }
        
        [MaxLength(8)]
        public string Duracao { get; set; }
        public string UrlImagem { get; set;}
        public DateTime DataLanc { get; set; }
        public string UrlSpotify { get; set; }

        [JsonIgnore] 
        public int QuantAcessos { get; set; } = 0;
        
        [Range(0, 10)]
        public byte MediaNota { get; set; }

        public int QuantAvaliacoes { get; set; } = 0;
        
        public ICollection<ArtistaMusica> ArtistasMusicas { get; set; }
        public int? AlbumId { get; set; }
        
        public Musica() { }

        public Musica(MusicaDTO dto)
        {
            this.Titulo = dto.Titulo;
            this.Single = dto.Single;
            this.Faixa = dto.Faixa;
            this.Duracao = dto.Duracao;
            this.UrlImagem = dto.UrlImagem;
            this.DataLanc = dto.DataLanc;
            this.UrlSpotify = dto.UrlSpotify;
        }
    }
}