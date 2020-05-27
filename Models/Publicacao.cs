namespace Maia.Models
{
    public class Publicacao
    {
        public long PublicacaoId { get; set; }
        public string Texto { get; set;}
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}