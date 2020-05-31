namespace Maia.Models
{
    public class Resposta
    {
        public long RespostaId { get; set; }
        public string Texto { get; set; }
        public long ComentarioId { get; set; }
        public Comentario Comentario { get; set; }
        public int UsuarioId { get; set; } 
        public Usuario Usuario { get; set; }
    }
}