using System.Text.Json.Serialization;

namespace Maia.Models
{
    public class Resposta : Comentario
    {
        public long ComentarioId { get; set; }
        public Comentario Comentario { get; set; }
    }
}