namespace MPGAboutAnts.Models
{
	public class Hex : IEntity
	{
		public int Id { get; set; }
		public int X { get; set; }
		public int Y { get; set; }
		public HexType? HexType { get; set; }
		public Map Map { get; set; }
		public Unit? Unit { get; set; }
	}
}
