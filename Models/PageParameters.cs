namespace Maia.Models
{
    public class PageParameters
{
	const int maxPageSize = 25;
	public int Page { get; set; } = 1;
 
	private int size = 9;
	public int Size
	{
		get
		{
			return size;
		}
		set
		{
			size = (value > maxPageSize) ? maxPageSize : value;
		}
	}
}
}