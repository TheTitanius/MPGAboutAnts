namespace MPGAboutAnts.Models
{
	public class Unit : IEntity
	{
		public int Id { get; set; }
		public UnitType Type { get; set; }
		public Hex Hex { get; set; }

		public int HexId { get; set; }
	}
}
