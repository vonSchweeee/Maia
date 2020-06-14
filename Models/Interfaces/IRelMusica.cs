using System.ComponentModel.DataAnnotations;

namespace Maia.Models.Interfaces
{
    public interface IRelMusica : IEntidade<long>
    {
        public long Id { get; set; }
        public long MusicaId { get; set; }
        public int UsuarioId { get; set; }
    }
}