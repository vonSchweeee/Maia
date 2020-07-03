using System.Text.Json.Serialization;

namespace Maia.Utils
{
    public class Resposta : Comentario
    {
        public long ComentarioId { get; set; }
        public Comentario Comentario { get; set; }
    }
}