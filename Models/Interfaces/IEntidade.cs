namespace Maia.Models.Interfaces
{
    public interface IEntidade<T>
    { 
        public T Id { get; set; }
        public bool Ativo { get; set; }
    }
}