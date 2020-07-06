using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Maia.Models.Abstracts;
using Maia.Models.DTO;
using Newtonsoft.Json;

namespace Maia.Models
{
    public class Musica : Entidade<long>
    {
        [Required]
        public string Titulo { get; set; }

        public bool Single { get; set; } = false;
        public int? Faixa { get; set; }
        
        [MaxLength(8)]
        [RegularExpression("/(?:[01]\\d|2[0123]):(?:[012345]\\d):(?:[012345]\\d)/gm")]
        public string Duracao { get; set; }
        public string UrlImagem { get; set;}
        public DateTime DataLanc { get; set; }
        public string UrlSpotify { get; set; }
        public string UrlYoutube { get; set; }

        [JsonIgnore] 
        public int QuantAcessos { get; set; } = 0;
        
        [Range(0, 10)]
        public byte MediaNota { get; set; }

        public int QuantAvaliacoes { get; set; } = 0;
        
        public List<ArtistaMusica> ArtistaMusicas { get; set; }
        public int? AlbumId { get; set; }
        public Album Album { get; set; }
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
            this.UrlYoutube = dto.UrlYoutube;
        }
    }
}