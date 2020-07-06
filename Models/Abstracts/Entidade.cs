using System.Text.Json.Serialization;

namespace Maia.Models.Abstracts
{
    public abstract class Entidade<T>
    { 
        public T Id { get; set; }

        [JsonIgnore]
        public bool Ativo { get; set; } = true;
    }
}