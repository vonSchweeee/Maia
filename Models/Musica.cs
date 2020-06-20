using System;
using System.Collections.Generic;
using System.ComponentModel;
using Maia.Models.Interfaces;
using System.Text.Json.Serialization;

namespace Maia.Models
{
    public class Musica : IEntidade<long>
    {
        public long Id { get; set; }
        
        [JsonIgnore]
        [DefaultValue(true)]
        public bool Ativo { get; set; }
        public string Titulo { get; set; }
        public string Letra { get; set; }
        public bool Single { get; set; }
        public string urlImagem { get; set;}
        public DateTime DataLanc { get; set; }
        public ICollection<ArtistaMusica> ArtistasMusicas { get; set; }
        public int? AlbumId { get; set; }
    }
}