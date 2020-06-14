using System.Text.Json.Serialization;

namespace Maia.Models
{
    public class Resposta : Comentario
    {
        public Resposta(string texto, int usuarioId, int postId) : base(texto, usuarioId, postId)
        {
        }

        public long ComentarioId { get; set; }
        public Comentario Comentario { get; set; }
    }
}