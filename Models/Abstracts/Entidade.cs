using System.Text.Json.Serialization;

namespace Maia.Utils.Abstracts
{
    public abstract class Entidade<T>
    { 
        public T Id { get; set; }

        [JsonIgnore]
        public bool Ativo { get; set; } = true;
    }
}