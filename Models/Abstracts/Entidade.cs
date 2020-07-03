namespace Maia.Utils.Abstracts
{
    public abstract class Entidade<T>
    { 
        public T Id { get; set; }
        public bool Ativo { get; set; }
    }
}