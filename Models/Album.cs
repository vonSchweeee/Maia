using System.Collections.Generic;
using System.ComponentModel;
using Maia.Models.Interfaces;
using System.Text.Json.Serialization;

namespace Maia.Models
{
    public class Album : IEntidade<int>
    {
        public int Id { get; set; }
        [JsonIgnore]
        [DefaultValue(true)]
        public bool Ativo { get; set; }
        public string Titulo { get; set; }
        public int ArtistaId { get; set; }
        public string urlImagem { get; set; }
        public Artista Artista { get; set; }
        public List<Musica> Musicas { get; set; }
    }
}