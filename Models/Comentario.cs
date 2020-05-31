using System.Collections.Generic;

namespace Maia.Models
{
    public class Comentario
    {
        public long ComentarioId { get; set; }
        public string Texto { get; set; }
        public int UsuarioId { get; set;}
        public int PublicacaoId { get; set; }
        public List<Resposta> Respostas { get; set; }
    }
}